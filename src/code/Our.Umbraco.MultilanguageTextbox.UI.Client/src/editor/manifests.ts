import MultilanguageTextboxEditorUIElement from "./editor";

const ui: UmbExtensionManifest = {
  type: "propertyEditorUi",
  alias: "Our.Umbraco.MultilanguageTextbox.PropertyEditorUi",
  name: "Multilanguage Textbox Property Editor",
  element: MultilanguageTextboxEditorUIElement,
  meta: {
    label: "Multilanguage Textbox",
    icon: "icon-indent",
    group: "common",
    propertyEditorSchemaAlias: "Our.Umbraco.MultilanguageTextbox",
  },
};

const schema: UmbExtensionManifest = {
  type: "propertyEditorSchema",
  name: "Multilanguage Textbox Property Editor Schema",
  alias: "Our.Umbraco.MultilanguageTextbox",
  meta: {
    defaultPropertyEditorUiAlias:
      "Our.Umbraco.MultilanguageTextbox.PropertyEditorUi",
    settings: {
      properties: [
        {
          alias: "isMandatoryLanguageRequired",
          label: "Make mandatory language(s) required",
          description:
            "Make mandatory language(s) required. Is only applicable if the property is not marked as mandatory.",
          propertyEditorUiAlias: "Umb.PropertyEditorUi.Toggle",
        },
        {
          alias: "useTextArea",
          label: "Use text area",
          description:
            "Use a text area instead of text input field.",
          propertyEditorUiAlias: "Umb.PropertyEditorUi.Toggle",
        },
      ],
    },
  },
};

export const manifests = [ui, schema];
