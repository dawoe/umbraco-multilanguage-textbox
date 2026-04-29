// <copyright file="MultiLanguageTextboxDataEditor.cs" company="Our.Umbraco">
// Copyright (c) Dave Woestenborghs &amp; Contributors
// </copyright>

using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.PropertyEditors;

namespace Our.Umbraco.MultilanguageTextbox.Core;

/// <summary>
/// Represents the multi language text box data editor configuration.
/// </summary>
[DataEditor(Constants.PropertyEditorAlias, ValueType = "JSON", ValueEditorIsReusable = true)]
internal class MultiLanguageTextboxDataEditor(IDataValueEditorFactory dataValueEditorFactory, IIOHelper ioHelper)
    : DataEditor(dataValueEditorFactory)
{
    /// <inheritdoc />
    protected override IConfigurationEditor CreateConfigurationEditor() => new MultiLanguageTextboxConfigurationEditor(ioHelper);
}
