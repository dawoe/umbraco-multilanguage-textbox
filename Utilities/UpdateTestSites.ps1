$CurrentDir = Split-Path $MyInvocation.MyCommand.Path

$RootDir = Split-Path -Path $CurrentDir -Parent

$dateTime = get-date -Format "yyyyMMddHHmmss"

Write-Host "Version suffix $dateTime"

dotnet pack $RootDir\src\Our.Umbraco.MultilanguageTextbox.sln -c Debug -o $RootDir\testsites\nuget --version-suffix "$dateTime" --no-build

cd  "$RootDir\testsites\MultiLanguageTextbox"

dotnet add package Our.Umbraco.MultilanguageTextbox -v 10.0.0-$dateTime --no-restore

cd $CurrentDir