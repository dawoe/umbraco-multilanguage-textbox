$CurrentDir = Split-Path $MyInvocation.MyCommand.Path
$RootDir = Split-Path -Path $CurrentDir -Parent
$SiteDir= "$RootDir\testsites\MultiLanguageTextbox"



dotnet watch run --no-restore  --project $SiteDir