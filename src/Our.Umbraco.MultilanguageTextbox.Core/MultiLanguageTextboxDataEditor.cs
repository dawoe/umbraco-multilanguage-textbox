// <copyright file="MultiLanguageTextboxDataEditor.cs" company="Our.Umbraco">
// Copyright (c) Dave Woestenborghs &amp; Contributors
// </copyright>

using Umbraco.Core.Logging;
using Umbraco.Core.PropertyEditors;

namespace Our.Umbraco.MultilanguageTextbox.Core
{
    /// <summary>
    /// Represents the multi language text box data editor configuration.
    /// </summary>
    [DataEditor(Constants.PropertyEditorAlias, "Multi language text box", "~/App_Plugins/Our.Umbraco.MultiLanguageTextbox/editor.html", ValueType = "JSON", Group = "common", Icon = "icon-indent")]
    internal class MultiLanguageTextboxDataEditor : DataEditor
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MultiLanguageTextboxDataEditor"/> class.
        /// </summary>
        /// <param name="logger">A <see cref="ILogger"/> instance.</param>
        public MultiLanguageTextboxDataEditor(ILogger logger)
            : base(logger)
        {
        }

        /// <inheritdoc/>
        protected override IConfigurationEditor CreateConfigurationEditor() => new MultiLanguageTextboxConfigurationEditor();
    }
}
