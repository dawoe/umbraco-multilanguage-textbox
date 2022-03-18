// <copyright file="MultiLanguageTextboxDataEditor.cs" company="Our.Umbraco">
// Copyright (c) Dave Woestenborghs &amp; Contributors
// </copyright>

#if NET472
using Umbraco.Core.Logging;
using Umbraco.Core.PropertyEditors;
#else
using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.PropertyEditors;
#endif

namespace Our.Umbraco.MultilanguageTextbox.Core
{
    /// <summary>
    /// Represents the multi language text box data editor configuration.
    /// </summary>
    [DataEditor(Constants.PropertyEditorAlias, "Multi language text box", "~/App_Plugins/Our.Umbraco.MultiLanguageTextbox/editor.html", ValueType = "JSON", Group = "common", Icon = "icon-indent")]
    internal class MultiLanguageTextboxDataEditor : DataEditor
    {
#if NET472
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
#else
        private readonly IIOHelper ioHelper;

        /// <summary>
        /// Initializes a new instance of the <see cref="MultiLanguageTextboxDataEditor"/> class.
        /// </summary>
        /// <param name="dataValueEditorFactory">A data value editor factory</param>
        /// <param name="ioHelper">A IO helper.</param>
        public MultiLanguageTextboxDataEditor(IDataValueEditorFactory dataValueEditorFactory, IIOHelper ioHelper)
            : base(dataValueEditorFactory) => this.ioHelper = ioHelper;

        /// <inheritdoc />
        protected override IConfigurationEditor CreateConfigurationEditor() => new MultiLanguageTextboxConfigurationEditor(this.ioHelper);
#endif
    }
}
