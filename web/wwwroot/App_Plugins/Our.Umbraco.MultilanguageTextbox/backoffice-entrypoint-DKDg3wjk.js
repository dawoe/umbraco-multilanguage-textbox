import { css as L, LitElement as I, nothing as f, repeat as w, when as P, html as u, property as v, state as p, customElement as U } from "@umbraco-cms/backoffice/external/lit";
import { UmbPropertyValueChangeEvent as E } from "@umbraco-cms/backoffice/property-editor";
import { LanguageService as R } from "@umbraco-cms/backoffice/external/backend-api";
import { UmbElementMixin as $ } from "@umbraco-cms/backoffice/element-api";
import { umbBindToValidation as b } from "@umbraco-cms/backoffice/validation";
const C = L`
.multilang-row {
    display: flex;
    gap: 10px;
    margin-bottom: 5px;

    & > uui-input, & > uui-textarea {
        flex: 1;
        max-width: 800px;
    }

    .label {
        width: 160px;
    }
}
.required {
    color: var(--uui-color-danger-standalone,rgb(191, 33, 78));
}
`;
var A = Object.defineProperty, q = Object.getOwnPropertyDescriptor, T = (e) => {
  throw TypeError(e);
}, s = (e, t, a, i) => {
  for (var n = i > 1 ? void 0 : i ? q(t, a) : t, r = e.length - 1, l; r >= 0; r--)
    (l = e[r]) && (n = (i ? l(t, a, n) : l(n)) || n);
  return i && n && A(t, a, n), n;
}, x = (e, t, a) => t.has(e) || T("Cannot " + a), O = (e, t, a) => (x(e, t, "read from private field"), a ? a.call(e) : t.get(e)), y = (e, t, a) => t.has(e) ? T("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), S = (e, t, a, i) => (x(e, t, "write to private field"), t.set(e, a), a), M = (e, t, a) => (x(e, t, "access private method"), a), g, d, m;
const h = "our-multilanguage-textbox";
let o = class extends $(I) {
  constructor() {
    super(), y(this, d), y(this, g, []), this.isReady = !1, console.debug("[MultiLangTextbox] Constructor called");
  }
  set value(e) {
    console.debug("[MultiLangTextbox] Value setter called with:", e), e = e || [], S(this, g, e);
  }
  get value() {
    return O(this, g);
  }
  set config(e) {
    console.debug("[MultiLangTextbox] Config setter called with:", e), this.assignValuesFromConfig(e);
  }
  firstUpdated(e) {
    console.debug("[MultiLangTextbox] firstUpdated called"), this.runPrepItems().then(() => {
      console.debug("[MultiLangTextbox] runPrepItems completed, isReady = true"), this.isReady = !0;
    }).catch((t) => {
      console.error("[MultiLangTextbox] runPrepItems error:", t);
    });
  }
  async runPrepItems() {
    var e;
    console.debug("[MultiLangTextbox] runPrepItems - fetching languages...");
    try {
      const t = await R.getLanguage();
      console.debug("[MultiLangTextbox] Language API response:", t), this.langItems = (e = t.data) == null ? void 0 : e.items, console.debug("[MultiLangTextbox] langItems set to:", this.langItems);
    } catch (t) {
      throw console.error("[MultiLangTextbox] Error fetching languages:", t), t;
    }
  }
  assignValuesFromConfig(e) {
    this.configIsMandatoryLanguageRequired = e.getValueByAlias(c.isMandatoryLanguageRequired.alias) ?? !1, this.configUseTextArea = e.getValueByAlias(c.useTextArea.alias) ?? !1;
  }
  render() {
    return console.debug("[MultiLangTextbox] render() called - isReady:", this.isReady, "langItems:", this.langItems), !this.isReady || !this.langItems ? (console.debug("[MultiLangTextbox] Rendering nothing - waiting for data"), f) : (console.debug("[MultiLangTextbox] Rendering full component with", this.langItems.length, "languages"), u`
         <div class="multilang-wrap">
            ${w(this.langItems, (e) => e.isoCode, (e) => {
      const t = this.value.find((i) => i.culture === e.isoCode) ?? { culture: e.isoCode, text: "" }, a = this.configIsMandatoryLanguageRequired && e.isMandatory;
      return u`
                <uui-form-validation-message>
                    <div class="multilang-row">
                        <span class="label">${e.name}${P(a, () => u`<strong class="required">*</strong>`, () => f)}</span>
                        ${this.configUseTextArea ? u`
                            <uui-textarea label="${e.name}" name="${e.isoCode}" @input=${M(this, d, m)} .value=${t.text} ?required=${a} ${b(this)}></uui-textarea>
                            ` : u`
                            <uui-input label="${e.name}" name="${e.isoCode}" @input=${M(this, d, m)} .value=${t.text} ?required=${a} ${b(this)}></uui-input>
                        `}
                    </div>
                </uui-form-validation-message>
            `;
    })}
        </div>
        `);
  }
};
g = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakSet();
m = function(e) {
  e.stopPropagation();
  const t = e.target, a = t.value, i = t.name, n = JSON.parse(JSON.stringify(this.value)), r = n.findIndex((_) => _.culture === i), l = {
    culture: i,
    text: a
  };
  r !== -1 ? n[r] = l : n.push(l), this.value = n, this.dispatchEvent(new E());
};
o.styles = [C];
s([
  v({ type: JSON, attribute: !1 })
], o.prototype, "value", 1);
s([
  v({ attribute: !1 })
], o.prototype, "config", 1);
s([
  p()
], o.prototype, "configIsMandatoryLanguageRequired", 2);
s([
  p()
], o.prototype, "configUseTextArea", 2);
s([
  p()
], o.prototype, "isReady", 2);
s([
  p()
], o.prototype, "langItems", 2);
o = s([
  U(h)
], o);
const V = o, k = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get MultilanguageTextboxElement() {
    return o;
  },
  default: V,
  elementName: h
}, Symbol.toStringTag, { value: "Module" })), c = {
  isMandatoryLanguageRequired: {
    label: "Make mandatory language(s) required",
    description: "Make mandatory language(s) required. Is only applicable if the property is not marked as mandatory",
    alias: "isMandatoryLanguageRequired",
    propertyEditorUiAlias: "Umb.PropertyEditorUi.Toggle"
  },
  useTextArea: {
    label: "Use text area",
    description: "Use a text area instead of text input field.",
    alias: "useTextArea",
    propertyEditorUiAlias: "Umb.PropertyEditorUi.Toggle"
  }
}, B = Object.keys(c).map((e) => c[e]), N = [
  // Conditional Radio
  {
    type: "propertyEditorUi",
    alias: "Our.Umbraco.MultilanguageTextbox",
    name: "Multi language text box",
    element: () => Promise.resolve().then(() => k),
    elementName: h,
    meta: {
      label: "Multi language text box",
      icon: "icon-indent",
      group: "common",
      propertyEditorSchemaAlias: "Umbraco.Plain.Json",
      settings: {
        properties: B
        // defaultData: [
        //     {
        //         alias: multiLangProperties.labelsPos.alias,
        //         value: 'Right'
        //     }
        // ]
      }
    }
  }
], z = (e, t) => {
  console.debug("[MultiLangTextbox] Backoffice entrypoint onInit called");
  const a = [...N];
  console.debug("[MultiLangTextbox] Registering manifests:", a), t.registerMany(a), console.debug("[MultiLangTextbox] Manifests registered successfully");
}, G = (e, t) => {
  console.debug("[MultiLangTextbox] Backoffice entrypoint onUnload called");
};
export {
  z as onInit,
  G as onUnload
};
//# sourceMappingURL=backoffice-entrypoint-DKDg3wjk.js.map
