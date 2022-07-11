$CurrentDir = Split-Path $MyInvocation.MyCommand.Path

#Prepare update
. $CurrentDir\Prepare.ps1 

Prepare-Solution -CurrentDir $CurrentDir

$RootDir = Split-Path -Path $CurrentDir -Parent
$buildFolder = Join-Path -Path $RootDir -ChildPath 'build';

#Copy App_Plugins folder
Copy-Item -Path "$buildFolder\App_Plugins" -Destination "$RootDir\testsites\v8" -Recurse -Force

#Copy bin folder
Copy-Item -Path "$buildFolder\bin\*.*" -Destination "$RootDir\testsites\v8\bin" -Force

Write-Host "Create nuget packages"

$dateTime = get-date -Format "yyyyMMddHHmmss"

Write-Host "Version suffix $dateTime"

dotnet pack $RootDir\src\Our.Umbraco.MultilanguageTextbox.sln -c Debug -o $RootDir\testsites\nuget --version-suffix "$dateTime" --no-build

cd  "$RootDir\testsites\v9"

dotnet add package Our.Umbraco.MultilanguageTextbox -v 2.3.0-$dateTime --no-restore
dotnet build

cd $CurrentDir