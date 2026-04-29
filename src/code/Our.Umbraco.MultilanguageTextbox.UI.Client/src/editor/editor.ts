import {
    LitElement,
    html,
    css,
    nothing,
    customElement,
    property,
    state,
    repeat,
} from '@umbraco-cms/backoffice/external/lit';
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { UmbChangeEvent } from '@umbraco-cms/backoffice/event';
import type {
    UmbPropertyEditorConfigCollection,
    UmbPropertyEditorUiElement,
} from '@umbraco-cms/backoffice/property-editor';
import { UMB_PROPERTY_CONTEXT } from '@umbraco-cms/backoffice/property';
import { UmbLanguageCollectionRepository } from '@umbraco-cms/backoffice/language';
import type { UmbLanguageDetailModel } from '@umbraco-cms/backoffice/language';
import {
    UMB_VALIDATION_CONTEXT,
    type UmbValidator,
} from '@umbraco-cms/backoffice/validation';

export interface MultilanguageTextboxValueItem {
    culture: string;
    text: string;
}

export type MultilanguageTextboxValue = Array<MultilanguageTextboxValueItem>;

/**
 * Cross-field validator that ensures at least one culture has a non-empty value
 * when the property itself is marked as mandatory.
 */
class AtLeastOneFilledValidator extends EventTarget implements UmbValidator {
    #host: MultilanguageTextboxEditorUIElement;
    #valid = true;

    constructor(host: MultilanguageTextboxEditorUIElement) {
        super();
        this.#host = host;
    }

    get isValid(): boolean {
        return this.#valid;
    }

    async validate(): Promise<void> {
        this.#valid = this.#host.hasAnyValue();
    }

    reset(): void {
        this.#valid = true;
    }

    focusFirstInvalidElement(): void {
        this.#host.focusFirstInput();
    }

    destroy(): void {
        // no-op
    }
}

@customElement('multilanguage-textbox-editor-ui')
export default class MultilanguageTextboxEditorUIElement
    extends UmbElementMixin(LitElement)
    implements UmbPropertyEditorUiElement {
    @property({ type: Array })
    public value: MultilanguageTextboxValue = [];

    @state()
    private _useTextArea = false;

    @state()
    private _isMandatoryLanguageRequired = false;

    @state()
    private _isPropertyMandatory = false;

    @state()
    private _languages: UmbLanguageDetailModel[] = [];

    @state()
    private _atLeastOneError = false;

    #languageRepo = new UmbLanguageCollectionRepository(this);
    #atLeastOneValidator?: AtLeastOneFilledValidator;
    #validationContext?: typeof UMB_VALIDATION_CONTEXT.TYPE;

    @property({ attribute: false })
    public set config(config: UmbPropertyEditorConfigCollection | undefined) {
        this._useTextArea = config?.getValueByAlias<boolean>('useTextArea') ?? false;
        this._isMandatoryLanguageRequired =
            config?.getValueByAlias<boolean>('isMandatoryLanguageRequired') ?? false;
    }

    constructor() {
        super();

        this.consumeContext(UMB_PROPERTY_CONTEXT, (propertyContext) => {
            this.observe(
                propertyContext?.validationMandatory,
                (mandatory) => {
                    this._isPropertyMandatory = mandatory ?? false;
                    this.#refreshAtLeastOneError();
                },
                'observePropertyMandatory',
            );
        });

        this.consumeContext(UMB_VALIDATION_CONTEXT, (validationContext) => {
            if (this.#validationContext && this.#atLeastOneValidator) {
                this.#validationContext.removeValidator(this.#atLeastOneValidator);
            }

            this.#validationContext = validationContext;

            if (validationContext) {
                this.#atLeastOneValidator ??= new AtLeastOneFilledValidator(this);
                validationContext.addValidator(this.#atLeastOneValidator);
            }
        });
    }

    override async connectedCallback(): Promise<void> {
        super.connectedCallback();
        await this.#loadLanguages();
    }

    override disconnectedCallback(): void {
        if (this.#validationContext && this.#atLeastOneValidator) {
            this.#validationContext.removeValidator(this.#atLeastOneValidator);
        }
        super.disconnectedCallback();
    }

    async #loadLanguages(): Promise<void> {
        const { data } = await this.#languageRepo.requestCollection({});
        this._languages = data?.items ?? [];
    }

    /** True if any culture has a non-empty trimmed text value. */
    public hasAnyValue(): boolean {
        return (this.value ?? []).some((v) => (v.text ?? '').trim().length > 0);
    }

    public focusFirstInput(): void {
        const el = this.renderRoot.querySelector<HTMLElement>('uui-input, uui-textarea');
        el?.focus();
    }

    #getTextFor(culture: string): string {
        return this.value?.find((v) => v.culture === culture)?.text ?? '';
    }

    #onInput(culture: string, e: Event) {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        const text = target.value ?? '';

        const next: MultilanguageTextboxValue = [...(this.value ?? [])];
        const idx = next.findIndex((v) => v.culture === culture);
        if (idx >= 0) {
            next[idx] = { culture, text };
        } else {
            next.push({ culture, text });
        }

        this.value = next;
        this.#refreshAtLeastOneError();
        this.dispatchEvent(new UmbChangeEvent());
    }

    #refreshAtLeastOneError(): void {
        this._atLeastOneError = this._isPropertyMandatory && !this.hasAnyValue();
    }

    #isLanguageRequired(language: UmbLanguageDetailModel): boolean {
        // When property itself is mandatory, individual language fields are not
        // required (the cross-field validator enforces "at least one").
        if (this._isPropertyMandatory) return false;
        return this._isMandatoryLanguageRequired && language.isMandatory;
    }

    override render() {
        if (this._languages.length === 0) {
            return html`<em>No languages configured.</em>`;
        }

        return html`
            <div class="fields">
                ${repeat(
                    this._languages,
                    (l) => l.unique,
                    (l) => this.#renderField(l),
                )}
            </div>
            ${this._atLeastOneError
                ? html`<div class="error">At least one language must have a value.</div>`
                : nothing}
        `;
    }

    #renderField(language: UmbLanguageDetailModel) {
        const required = this.#isLanguageRequired(language);
        const value = this.#getTextFor(language.unique);

        return html`
            <uui-form-layout-item>
                <uui-label slot="label" for="input-${language.unique}">
                    ${language.name}${required ? html` <span class="req">*</span>` : nothing}
                </uui-label>

                ${this._useTextArea
                    ? html`
                          <uui-textarea
                              id="input-${language.unique}"
                              .value=${value}
                              ?required=${required}
                              @input=${(e: Event) => this.#onInput(language.unique, e)}
                          ></uui-textarea>
                      `
                    : html`
                          <uui-input
                              id="input-${language.unique}"
                              .value=${value}
                              ?required=${required}
                              @input=${(e: Event) => this.#onInput(language.unique, e)}
                          ></uui-input>
                      `}
            </uui-form-layout-item>
        `;
    }

    static override styles = css`
        :host {
            display: block;
        }
        .fields {
            display: flex;
            flex-direction: column;
            gap: var(--uui-size-space-3, 12px);
        }
        uui-input,
        uui-textarea {
            width: 100%;
        }
        .req {
            color: var(--uui-color-danger, #d42054);
        }
        .error {
            margin-top: var(--uui-size-space-3, 12px);
            color: var(--uui-color-danger, #d42054);
            font-size: 0.9em;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'multilanguage-textbox-editor-ui': MultilanguageTextboxEditorUIElement;
    }
}