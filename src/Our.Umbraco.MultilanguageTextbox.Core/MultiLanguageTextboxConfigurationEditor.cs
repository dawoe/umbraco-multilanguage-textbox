// <copyright file="MultiLanguageTextboxConfigurationEditor.cs" company="Our.Umbraco">
// Copyright (c) Dave Woestenborghs &amp; Contributors
// </copyright>

using Umbraco.Core.PropertyEditors;

namespace Our.Umbraco.MultilanguageTextbox.Core
{
    /// <summary>
    /// Represents the multi language textbox configuration editor.
    /// </summary>
    internal class MultiLanguageTextboxConfigurationEditor : ConfigurationEditor<MultiLanguageTextboxConfiguration>
    {
        /// <inheritdoc/>
        public override object DefaultConfigurationObject => new MultiLanguageTextboxConfiguration
        {
            IsMandatoryLanguageRequired = false,
        };
    }
}
