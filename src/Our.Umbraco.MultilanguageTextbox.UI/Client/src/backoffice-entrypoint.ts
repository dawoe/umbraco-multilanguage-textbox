import { UmbEntryPointOnInit, UmbEntryPointOnUnload } from '@umbraco-cms/backoffice/extension-api';
import { manifests as dataEditorManifests } from './propertyeditors/manifest'

// load up the manifests here
export const onInit: UmbEntryPointOnInit = (_host, _extensionRegistry) => {
    console.debug('[MultiLangTextbox] Backoffice entrypoint onInit called');
    const manifests = [...dataEditorManifests];
    console.debug('[MultiLangTextbox] Registering manifests:', manifests);

    _extensionRegistry.registerMany(manifests);
    console.debug('[MultiLangTextbox] Manifests registered successfully');
};

export const onUnload: UmbEntryPointOnUnload = (_host, _extensionRegistry) => {
    console.debug('[MultiLangTextbox] Backoffice entrypoint onUnload called');
};
