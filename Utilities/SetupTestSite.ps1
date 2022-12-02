function Create-Test-Site {
    [CmdletBinding()]
	param(
		[Parameter()]
		[string] $Destination        
	)

    $CurrentDir = Get-Location

    Write-Host $CurrentDir

    Write-Host "Installing Umbraco templates"
    dotnet new --install Umbraco.Templates

    Write-Host "Creating Umbraco site"
    cd $Destination
    dotnet new umbraco -n MultiLanguageTextbox --development-database-type SQLite --version 11.0.0

    cd "$Destination\MultiLanguageTextbox"

    dotnet add package Umbraco.TheStarterKit --version 11.0.0 --source https://api.nuget.org/v3/index.json

    dotnet build

    # load project file xml
    $xml = New-Object System.Xml.XmlDocument
    $xml.Load("$Destination\MultiLanguageTextbox\MultiLanguageTextbox.csproj")

    $propertyGroup = Select-XML -Xml $xml -XPath '//PropertyGroup[1]'
    $newNode = $xml.CreateElement('RestoreAdditionalProjectSources')
    $newNode.InnerText = '../Nuget'
    $propertyGroup.Node.AppendChild($newNode)  
    $xml.Save("$Destination\MultiLanguageTextbox\MultiLanguageTextbox.csproj")

    cd $CurrentDir
}


$CurrentDir = Split-Path $MyInvocation.MyCommand.Path
$RootDir = Split-Path -Path $CurrentDir -Parent
$Destination= "$RootDir\testsites"

Write-Host "Cleaning up existing test site"

if (Test-Path -Path $Destination) {
    Remove-Item -LiteralPath $Destination -Force -Recurse
}

New-Item -Path $RootDir -Name "testsites" -ItemType "directory"

Create-Test-Site $Destination

Write-Host "Create nuget packages"

$dateTime = get-date -Format "yyyyMMddHHmmss"

Write-Host "Version suffix $dateTime"

dotnet pack $RootDir\src\Our.Umbraco.MultiLanguageTextbox.sln -c Debug -o $Destination\nuget --version-suffix "$dateTime"

cd "$Destination\MultiLanguageTextbox"

dotnet add package Our.Umbraco.MultiLanguageTextbox -v 11.0.0-$dateTime 

dotnet build

cd $CurrentDir