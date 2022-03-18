// <copyright file="MultiLanguageTextboxConfigurationEditor.cs" company="Our.Umbraco">
// Copyright (c) Dave Woestenborghs &amp; Contributors
// </copyright>

#if NET472
using Umbraco.Core.PropertyEditors;
#else
using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.PropertyEditors;
#endif

namespace Our.Umbraco.MultilanguageTextbox.Core
{
    /// <summary>
    /// Represents the multi language textbox configuration editor.
    /// </summary>
    internal class MultiLanguageTextboxConfigurationEditor : ConfigurationEditor<MultiLanguageTextboxConfiguration>
    {
#if NETCOREAPP
        /// <summary>
        /// Initializes a new instance of the <see cref="MultiLanguageTextboxConfigurationEditor"/> class.
        /// </summary>
        /// <param name="ioHelper">A IO Helper.</param>
        public MultiLanguageTextboxConfigurationEditor(IIOHelper ioHelper)
            : base(ioHelper)
        {
        }
#endif

        /// <inheritdoc/>
        public override object DefaultConfigurationObject => new MultiLanguageTextboxConfiguration
        {
            IsMandatoryLanguageRequired = false,
        };
    }
}
