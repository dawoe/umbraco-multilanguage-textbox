function Compile-Solution {
    [CmdletBinding()]
	param(
		[Parameter()]
		[string] $RootDir,
        
        [Parameter()]
		[string] $Configuration = 'Debug'
	)
   
    $solution= "$RootDir\src\Our.Umbraco.MultiLanguageTextbox.sln"  

    # Build the VS project
    Write-Host 'Cleaning Visual Studio solution.';

    dotnet clean $solution;

    Write-Host 'Compiling Visual Studio solution.';
    & dotnet build $solution --configuration $Configuration
    if (-NOT $?) {
        throw 'The dotnet CLI returned an error code.';
    }    
}