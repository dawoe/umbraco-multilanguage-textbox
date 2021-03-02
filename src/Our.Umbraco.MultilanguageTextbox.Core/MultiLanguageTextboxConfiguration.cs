// <copyright file="MultiLanguageTextboxConfiguration.cs" company="Our.Umbraco">
// Copyright (c) Dave Woestenborghs &amp; Contributors
// </copyright>

using Umbraco.Core.PropertyEditors;

namespace Our.Umbraco.MultilanguageTextbox.Core
{
    /// <summary>
    /// Represents the data type configuration.
    /// </summary>
    internal class MultiLanguageTextboxConfiguration
    {
        /// <summary>
        /// Gets or sets a value indicating whether the mandatory language is required, if the property is not marked as mandatory.
        /// </summary>
        [ConfigurationField("isMandatoryLanguageRequired", "Make mandatory language(s) required", "toggle", Description = "Make mandatory language(s) required. Is only applicable if the property is not marked as mandatory", Type = typeof(bool))]
        public bool IsMandatoryLanguageRequired { get; set; }
    }
}
