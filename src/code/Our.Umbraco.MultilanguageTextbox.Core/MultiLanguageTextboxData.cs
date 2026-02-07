// <copyright file="MultiLanguageTextboxData.cs" company="Our.Umbraco">
// Copyright (c) Dave Woestenborghs &amp; Contributors
// </copyright>

using Newtonsoft.Json;

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
        [JsonProperty("culture")]
        public string Culture { get; set; }

        /// <summary>
        /// Gets or sets the text.
        /// </summary>
        [JsonProperty("text")]
        public string Text { get; set; }
    }
}
