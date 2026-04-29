// <copyright file="MultiLanguageTextboxValueConverter.cs" company="Our.Umbraco">
// Copyright (c) Dave Woestenborghs &amp; Contributors
// </copyright>

using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Serialization;
using Umbraco.Extensions;

namespace Our.Umbraco.MultilanguageTextbox.Core;

/// <summary>
/// Represents the multi language text box value converter.
/// </summary>
/// <remarks>
/// Initializes a new instance of the <see cref="MultiLanguageTextboxValueConverter"/> class.
/// </remarks>
/// <param name="variationContextAccessor">
/// The variation context accessor.
/// </param>
public class MultiLanguageTextboxValueConverter(
    IVariationContextAccessor variationContextAccessor,
    IJsonSerializer jsonSerializer) : PropertyValueConverterBase
{
    /// <inheritdoc />
    public override bool IsConverter(IPublishedPropertyType propertyType) =>
        Constants.PropertyEditorAlias.Equals(propertyType.EditorUiAlias);

    /// <inheritdoc />
    public override Type GetPropertyValueType(IPublishedPropertyType propertyType) => typeof(string);

    /// <inheritdoc />
    public override bool? IsValue(object? value, PropertyValueLevel level) => value?.ToString() != "[]";

    /// <inheritdoc />
    public override object? ConvertSourceToIntermediate(
        IPublishedElement owner,
        IPublishedPropertyType propertyType,
        object? source,
        bool preview) =>
        source?.ToString();

    /// <inheritdoc />
    public override object ConvertIntermediateToObject(
        IPublishedElement owner,
        IPublishedPropertyType propertyType,
        PropertyCacheLevel referenceCacheLevel,
        object? inter,
        bool preview)
    {
        if (inter == null)
        {
            return string.Empty;
        }

        var interValue = inter.ToString();

        if (string.IsNullOrWhiteSpace(interValue))
        {
            return string.Empty;
        }

        var cultureTexts = jsonSerializer.Deserialize<List<MultiLanguageTextboxData>>(interValue);

        if (cultureTexts is null || cultureTexts.Count == 0)
        {
            return string.Empty;
        }

        var currentCulture = variationContextAccessor.VariationContext?.Culture ?? string.Empty;

        var currentCultureText = cultureTexts.FirstOrDefault(x => x.Culture.InvariantEquals(currentCulture));

        if (currentCultureText != null)
        {
            return currentCultureText.Text ?? string.Empty;
        }

        return string.Empty;
    }
}
