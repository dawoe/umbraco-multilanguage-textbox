// <copyright file="PackageComposer.cs" company="Our.Umbraco">
// Copyright (c) Dave Woestenborghs &amp; Contributors
// </copyright>

using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace Our.Umbraco.MultilanguageTextbox.UI
{
    internal class PackageComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder) => builder.ManifestFilters().Append<PackageManifestFilter>();
    }
}
