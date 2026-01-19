import { customElement, html, LitElement, nothing, property, PropertyValues, repeat, state, when } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyEditorConfigCollection, UmbPropertyValueChangeEvent } from "@umbraco-cms/backoffice/property-editor";
import { LanguageService, LanguageResponseModel } from '@umbraco-cms/backoffice/external/backend-api';
import { multiLangPropertyInfo } from "../manifest";
import { UUIBooleanInputEvent } from "@umbraco-cms/backoffice/external/uui";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { style } from './style.css'
import { umbBindToValidation } from "@umbraco-cms/backoffice/validation";

type MultiLanguageDto = {
    culture: string,
    text: string
};

export const elementName = `our-multilanguage-textbox`;

@customElement(elementName)
export class MultilanguageTextboxElement extends UmbElementMixin(LitElement) {

    constructor() {
        super();
        console.debug('[MultiLangTextbox] Constructor called');
    }

    #_value: Array<MultiLanguageDto> = [];
    @property({ type: JSON, attribute: false })
    public set value(val: Array<MultiLanguageDto>) {
        console.debug('[MultiLangTextbox] Value setter called with:', val);
        val = val || [];
        this.#_value = val;
    }
    public get value() {
        return this.#_value;
    }

    @property({ attribute: false })
    public set config(config: UmbPropertyEditorConfigCollection) {
        console.debug('[MultiLangTextbox] Config setter called with:', config);
        this.assignValuesFromConfig(config);
    }

    @state()
    private configIsMandatoryLanguageRequired!: boolean;

    @state()
    private configUseTextArea!: boolean;

    @state()
    private isReady: boolean = false;

    @state()
    public langItems: LanguageResponseModel[] | undefined;

    static override styles = [style];

    protected override firstUpdated(_changedProperties: PropertyValues): void {
        console.debug('[MultiLangTextbox] firstUpdated called');
        this.runPrepItems().then(() => {
            console.debug('[MultiLangTextbox] runPrepItems completed, isReady = true');
            this.isReady = true;
        }).catch(err => {
            console.error('[MultiLangTextbox] runPrepItems error:', err);
        });
    }

    private async runPrepItems() {
        console.debug('[MultiLangTextbox] runPrepItems - fetching languages...');
        try {
            const langResponse = await LanguageService.getLanguage();
            console.debug('[MultiLangTextbox] Language API response:', langResponse);
            this.langItems = langResponse.data?.items;
            console.debug('[MultiLangTextbox] langItems set to:', this.langItems);
        } catch (error) {
            console.error('[MultiLangTextbox] Error fetching languages:', error);
            throw error;
        }
    }

    private assignValuesFromConfig(config: UmbPropertyEditorConfigCollection) {
        this.configIsMandatoryLanguageRequired = config.getValueByAlias(multiLangPropertyInfo.isMandatoryLanguageRequired.alias) ?? false;
        this.configUseTextArea = config.getValueByAlias(multiLangPropertyInfo.useTextArea.alias) ?? false;
    }

    #onInput(event: UUIBooleanInputEvent) {
        event.stopPropagation();
        const target = event.target;
        const text = target.value;
        const culture = target.name;

        // find and update model value
        const valueObj = JSON.parse(JSON.stringify(this.value)) as MultiLanguageDto[];
        const itemIndex = valueObj.findIndex(x => x.culture === culture);
        const newValue = {
            culture,
            text
        };
        itemIndex !== -1
            ? valueObj[itemIndex] = newValue
            : valueObj.push(newValue);

        // update element value
        this.value = valueObj;
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }

    render() {
        console.debug('[MultiLangTextbox] render() called - isReady:', this.isReady, 'langItems:', this.langItems);
        
        if (!this.isReady || !this.langItems) {
            console.debug('[MultiLangTextbox] Rendering nothing - waiting for data');
            return nothing;
        }

        console.debug('[MultiLangTextbox] Rendering full component with', this.langItems.length, 'languages');
        return html`
         <div class="multilang-wrap">
            ${repeat(this.langItems, x => x.isoCode, lang => {
            const item: MultiLanguageDto = this.value.find(x => x.culture === lang.isoCode) ?? { culture: lang.isoCode, text: "" };
            const isMandatory = this.configIsMandatoryLanguageRequired && lang.isMandatory;
            return html`
                <uui-form-validation-message>
                    <div class="multilang-row">
                        <span class="label">${lang.name}${when(isMandatory, () => html`<strong class="required">*</strong>`, () => nothing)}</span>
                        ${this.configUseTextArea
                    ? html`
                            <uui-textarea label="${lang.name}" name="${lang.isoCode}" @input=${this.#onInput} .value=${item.text} ?required=${isMandatory} ${umbBindToValidation(this)}></uui-textarea>
                            `
                    : html`
                            <uui-input label="${lang.name}" name="${lang.isoCode}" @input=${this.#onInput} .value=${item.text} ?required=${isMandatory} ${umbBindToValidation(this)}></uui-input>
                        `}
                    </div>
                </uui-form-validation-message>
            `;
        })}
        </div>
        `;
    }
}

export default MultilanguageTextboxElement;

declare global {
    interface HTMLElementTagNameMap {
        [elementName]: MultilanguageTextboxElement;
    }
}