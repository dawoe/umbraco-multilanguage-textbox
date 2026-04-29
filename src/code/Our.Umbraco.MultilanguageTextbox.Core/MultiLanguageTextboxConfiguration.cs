// <copyright file="MultiLanguageTextboxConfiguration.cs" company="Our.Umbraco">
// Copyright (c) Dave Woestenborghs &amp; Contributors
// </copyright>

namespace Our.Umbraco.MultilanguageTextbox.Core;

/// <summary>
/// Represents the data type configuration.
/// </summary>
internal class MultiLanguageTextboxConfiguration
{
    /// <summary>
    /// Gets or sets a value indicating whether the mandatory language is required, if the property is not marked as mandatory.
    /// </summary>
    public bool IsMandatoryLanguageRequired { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether to use a text area instead of text field as input.
    /// </summary>
    public bool UseTextArea { get; set; }
}
