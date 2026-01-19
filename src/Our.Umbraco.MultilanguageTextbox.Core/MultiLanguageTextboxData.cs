// <copyright file="MultiLanguageTextboxData.cs" company="Our.Umbraco">
// Copyright (c) Dave Woestenborghs &amp; Contributors
// </copyright>

using System.Text.Json.Serialization;

namespace Our.Umbraco.MultilanguageTextbox.Core
{
    /// <summary>
    /// Represents multi language text box data.
    /// </summary>
    public class MultiLanguageTextboxData
    {
        /// <summary>
        /// Gets or sets the culture.
        /// </summary>
        [JsonPropertyName("culture")]
        public string Culture { get; set; }

        /// <summary>
        /// Gets or sets the text.
        /// </summary>
        [JsonPropertyName("text")]
        public string Text { get; set; }
    }
}
