import {
    html,
    css,
    nothing,
    customElement,
    property,
    state,
    repeat,
} from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbChangeEvent } from '@umbraco-cms/backoffice/event';
import type {
    UmbPropertyEditorConfigCollection,
    UmbPropertyEditorUiElement,
} from '@umbraco-cms/backoffice/property-editor';
import {
    UMB_APP_LANGUAGE_CONTEXT,
    type UmbLanguageDetailModel,
} from '@umbraco-cms/backoffice/language';
import {
    UmbFormControlMixin,
    type UmbFormControlMixinElement,
} from '@umbraco-cms/backoffice/validation';
import type { HTMLElementConstructor } from '@umbraco-cms/backoffice/extension-api';

export interface MultilanguageTextboxValueItem {
    culture: string;
    text: string;
}

export type MultilanguageTextboxValue = Array<MultilanguageTextboxValueItem>;

const FormControlElement: HTMLElementConstructor<
    UmbFormControlMixinElement<MultilanguageTextboxValue | undefined>
> &
    typeof UmbLitElement = UmbFormControlMixin<
    MultilanguageTextboxValue | undefined,
    typeof UmbLitElement
>(UmbLitElement);

@customElement('multilanguage-textbox-editor-ui')
export default class MultilanguageTextboxEditorUIElement
    extends FormControlElement
    implements UmbPropertyEditorUiElement {
    @state()
    private _useTextArea = false;

    @state()
    private _isMandatoryLanguageRequired = false;

    /** Set by the parent property element when the property is marked as mandatory. */
    @property({ type: Boolean })
    public mandatory = false;

    /** Set by the parent property element to override the default mandatory message. */
    @property({ type: String })
    public mandatoryMessage = 'This field is required.';

    @state()
    private _languages: UmbLanguageDetailModel[] = [];

    @property({ attribute: false })
    public set config(config: UmbPropertyEditorConfigCollection | undefined) {
        this._useTextArea = config?.getValueByAlias<boolean>('useTextArea') ?? false;
        this._isMandatoryLanguageRequired =
            config?.getValueByAlias<boolean>('isMandatoryLanguageRequired') ?? false;
    }

    constructor() {
        super();

        this.consumeContext(UMB_APP_LANGUAGE_CONTEXT, (appLanguageContext) => {
            this.observe(
                appLanguageContext?.languages,
                (languages) => {
                    this._languages = languages ?? [];
                },
                'observeLanguages',
            );
        });

        // "valueMissing" validator: blocks save when the property is mandatory
        // and no culture has a non-empty value.
        this.addValidator(
            'valueMissing',
            () => this.mandatoryMessage,
            () => this.mandatory && !this.#hasAnyValue(),
        );

        // Custom validator: when mandatory languages are required (and the
        // property itself is not mandatory), every mandatory language must have
        // a non-empty value.
        this.addValidator(
            'customError',
            () => this.#missingMandatoryLanguagesMessage(),
            () =>
                !this.mandatory &&
                this._isMandatoryLanguageRequired &&
                this.#missingMandatoryLanguages().length > 0,
        );
    }

    override willUpdate(changed: Map<string | number | symbol, unknown>): void {
        super.willUpdate(changed);
        if (
            changed.has('mandatory') ||
            changed.has('value') ||
            changed.has('_isMandatoryLanguageRequired') ||
            changed.has('_languages')
        ) {
            // Re-run validators so the parent form is notified when state changes.
            (this as unknown as { _runValidators: () => void })._runValidators?.();
        }
    }

    #hasAnyValue(): boolean {
        const value = this.value as MultilanguageTextboxValue | undefined;
        return (value ?? []).some((v) => (v.text ?? '').trim().length > 0);
    }

    #missingMandatoryLanguages(): UmbLanguageDetailModel[] {
        return this._languages.filter(
            (l) => l.isMandatory && this.#getTextFor(l.unique).trim().length === 0,
        );
    }

    #missingMandatoryLanguagesMessage(): string {
        const names = this.#missingMandatoryLanguages().map((l) => l.name).join(', ');
        return `The following mandatory language(s) are required: ${names}`;
    }

    #getTextFor(culture: string): string {
        const value = this.value as MultilanguageTextboxValue | undefined;
        return value?.find((v) => v.culture === culture)?.text ?? '';
    }

    #onInput(culture: string, e: Event) {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        const text = target.value ?? '';

        const current = (this.value as MultilanguageTextboxValue | undefined) ?? [];
        const next: MultilanguageTextboxValue = [...current];
        const idx = next.findIndex((v) => v.culture === culture);
        if (idx >= 0) {
            next[idx] = { culture, text };
        } else {
            next.push({ culture, text });
        }

        this.value = next;
        this.dispatchEvent(new UmbChangeEvent());
    }

    #isLanguageRequired(language: UmbLanguageDetailModel): boolean {
        // When the property itself is mandatory, individual language fields are
        // not required (the valueMissing validator enforces "at least one").
        if (this.mandatory) return false;
        return this._isMandatoryLanguageRequired && language.isMandatory;
    }

    override render() {
        if (this._languages.length === 0) {
            return html`<em>Loading languages...</em>`;
        }

        return html`
            <div class="fields">
                ${repeat(
                    this._languages,
                    (l) => l.unique,
                    (l) => this.#renderField(l),
                )}
            </div>
        `;
    }

    #renderField(language: UmbLanguageDetailModel) {
        const required = this.#isLanguageRequired(language);
        const value = this.#getTextFor(language.unique);
        const id = `input-${language.unique}`;

        return html`
            <uui-form-layout-item>
                <uui-label slot="label" for=${id}>
                    ${language.name}${required ? html` <span class="req">*</span>` : nothing}
                </uui-label>

                ${this._useTextArea
                    ? html`
                          <uui-textarea
                              id=${id}
                              .value=${value}
                              ?required=${required}
                              @input=${(e: Event) => this.#onInput(language.unique, e)}
                          ></uui-textarea>
                      `
                    : html`
                          <uui-input
                              id=${id}
                              .value=${value}
                              ?required=${required}
                              @input=${(e: Event) => this.#onInput(language.unique, e)}
                          ></uui-input>
                      `}
            </uui-form-layout-item>
        `;
    }

    static styles = css`
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
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'multilanguage-textbox-editor-ui': MultilanguageTextboxEditorUIElement;
    }
}
