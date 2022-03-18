// <copyright file="MultiLanguageTextboxValueConverter.cs" company="Our.Umbraco">
// Copyright (c) Dave Woestenborghs &amp; Contributors
// </copyright>

using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

#if NET472
using Umbraco.Core;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;
#else
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Extensions;
#endif

namespace Our.Umbraco.MultilanguageTextbox.Core
{
    /// <summary>
    /// Represents the multi language text box value converter.
    /// </summary>
    public class MultiLanguageTextboxValueConverter : PropertyValueConverterBase
    {
        private readonly IVariationContextAccessor variationContextAccessor;

        /// <summary>
        /// Initializes a new instance of the <see cref="MultiLanguageTextboxValueConverter"/> class.
        /// </summary>
        /// <param name="variationContextAccessor">
        /// The variation context accessor.
        /// </param>
        public MultiLanguageTextboxValueConverter(IVariationContextAccessor variationContextAccessor) => this.variationContextAccessor = variationContextAccessor;

        /// <inheritdoc />
        public override bool IsConverter(IPublishedPropertyType propertyType) =>
            Constants.PropertyEditorAlias.Equals(propertyType.EditorAlias);

        /// <inheritdoc />
        public override Type GetPropertyValueType(IPublishedPropertyType propertyType) => typeof(string);

        /// <inheritdoc />
        public override bool? IsValue(object value, PropertyValueLevel level) => value?.ToString() != "[]";

        /// <inheritdoc />
        public override object ConvertSourceToIntermediate(
            IPublishedElement owner,
            IPublishedPropertyType propertyType,
            object source,
            bool preview) =>
            source?.ToString();

        /// <inheritdoc />
        public override object ConvertIntermediateToObject(
            IPublishedElement owner,
            IPublishedPropertyType propertyType,
            PropertyCacheLevel referenceCacheLevel,
            object inter,
            bool preview)
        {
            if (inter == null)
            {
                return string.Empty;
            }

            var cultureTexts = JsonConvert.DeserializeObject<List<MultiLanguageTextboxData>>(inter.ToString());

            if (cultureTexts.Any())
            {
                var currentCulture = this.variationContextAccessor.VariationContext.Culture;

                var currentCultureText = cultureTexts.FirstOrDefault(x => x.Culture.InvariantEquals(currentCulture));

                if (currentCultureText != null)
                {
                    return currentCultureText.Text;
                }
            }

            return string.Empty;
        }
    }
}
