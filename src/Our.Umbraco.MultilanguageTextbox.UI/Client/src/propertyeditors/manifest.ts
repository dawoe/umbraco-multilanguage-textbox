import { PropertyEditorSettingsProperty } from "@umbraco-cms/backoffice/property-editor";
import { elementName as multilanguageTextboxElementName } from './multilanguage-textbox'

export const multiLangPropertyInfo = {
    isMandatoryLanguageRequired: {
        label: "Make mandatory language(s) required",
        description: "Make mandatory language(s) required. Is only applicable if the property is not marked as mandatory",
        alias: "isMandatoryLanguageRequired",
        propertyEditorUiAlias: "Umb.PropertyEditorUi.Toggle",
    },
    useTextArea: {
        label: "Use text area",
        description: "Use a text area instead of text input field.",
        alias: "useTextArea",
        propertyEditorUiAlias: "Umb.PropertyEditorUi.Toggle"
    }
} satisfies Record<string, PropertyEditorSettingsProperty & { value?: any }>;

const multiLangProperties: Array<PropertyEditorSettingsProperty & { value?: any }> = Object.keys(multiLangPropertyInfo).map(x => (multiLangPropertyInfo as unknown as Record<string, PropertyEditorSettingsProperty & { value?: any }>)[x]);

/// <summary>
//        /// Gets or sets a value indicating whether the mandatory language is required, if the property is not marked as mandatory.
//        /// </summary>
//        [ConfigurationField("isMandatoryLanguageRequired", "Make mandatory language(s) required", "boolean", Description = "Make mandatory language(s) required. Is only applicable if the property is not marked as mandatory")]
//        public bool IsMandatoryLanguageRequired { get; set; }

//        /// <summary>
//        /// Gets or sets a value indicating whether to use a text area instead of text field as input.
//        /// </summary>
//        [ConfigurationField("useTextArea", "Use text area", "boolean", Description = "Use a text area instead of text input field.")]
//        public bool UseTextArea { get; set; }

export const manifests: Array<UmbExtensionManifest> = [
    // Conditional Radio
    {
        type: "propertyEditorUi",
        alias: `Our.Umbraco.MultilanguageTextbox`,
        name: "Multi language text box",
        element: () => import("./multilanguage-textbox"),
        elementName: multilanguageTextboxElementName,
        meta: {
            label: "Multi language text box",
            icon: "icon-indent",
            group: "common",
            propertyEditorSchemaAlias: "Umbraco.Plain.Json",
            settings: {
                properties: multiLangProperties,
                // defaultData: [
                //     {
                //         alias: multiLangProperties.labelsPos.alias,
                //         value: 'Right'
                //     }
                // ]
            }
        },
    },
];
