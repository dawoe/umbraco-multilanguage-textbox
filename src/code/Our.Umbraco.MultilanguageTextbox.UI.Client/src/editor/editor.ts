import { LitElement, html, customElement, property } from '@umbraco-cms/backoffice/external/lit';
import type { UmbPropertyEditorUiElement } from '@umbraco-cms/backoffice/property-editor';


@customElement('multilanguage-textbox-editor-ui')
export default class MultilanguageTextboxEditorUIElement extends LitElement implements UmbPropertyEditorUiElement {
    @property({ type: String })
    public value = '';

    override render() {
        return html`I'm a property editor!`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'multilanguage-textbox-editor-ui': MultilanguageTextboxEditorUIElement;
    }
}