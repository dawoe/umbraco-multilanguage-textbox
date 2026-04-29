// <copyright file="MultiLanguageTextboxConfigurationEditor.cs" company="Our.Umbraco">
// Copyright (c) Dave Woestenborghs &amp; Contributors
// </copyright>

using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.PropertyEditors;

namespace Our.Umbraco.MultilanguageTextbox.Core;

/// <summary>
/// Represents the multi language textbox configuration editor.
/// </summary>
internal class MultiLanguageTextboxConfigurationEditor(IIOHelper ioHelper)
    : ConfigurationEditor<MultiLanguageTextboxConfiguration>(ioHelper);
