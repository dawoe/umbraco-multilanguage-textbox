// <copyright file="PackageManifestFilter.cs" company="Our.Umbraco">
// Copyright (c) Dave Woestenborghs &amp; Contributors
// </copyright>

using System.Collections.Generic;
using Umbraco.Cms.Core.Manifest;

namespace Our.Umbraco.MultilanguageTextbox.UI
{
    /// <summary>
    /// Represents a <see cref="IManifestFilter"/> to register back office assets.
    /// </summary>
    internal class PackageManifestFilter : IManifestFilter
    {
        /// <inheritdoc />
        public void Filter(List<PackageManifest> manifests) =>
            manifests.Add(new()
            {
                PackageName = "Our.Umbraco.MultilanguageTextbox",
                Scripts = new[]
                {
                    "/App_Plugins/Our.Umbraco.MultiLanguageTextbox/controller.js",
                },
            });
    }
}
