// <copyright file="MultiLanguageTextboxConfiguration.cs" company="Our.Umbraco">
// Copyright (c) Dave Woestenborghs &amp; Contributors
// </copyright>

using Umbraco.Cms.Core.PropertyEditors;

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
        [ConfigurationField("isMandatoryLanguageRequired", "Make mandatory language(s) required", "boolean", Description = "Make mandatory language(s) required. Is only applicable if the property is not marked as mandatory")]
        public bool IsMandatoryLanguageRequired { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether to use a text area instead of text field as input.
        /// </summary>
        [ConfigurationField("useTextArea", "Use text area", "boolean", Description = "Use a text area instead of text input field.")]
        public bool UseTextArea { get; set; }
    }
}
