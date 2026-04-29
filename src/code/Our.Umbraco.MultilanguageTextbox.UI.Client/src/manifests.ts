import type { UmbBackofficeExtensionRegistry } from "@umbraco-cms/backoffice/extension-registry";
import { manifests as EditorManifests } from "./editor/manifests";

export function registerManifest(registry: UmbBackofficeExtensionRegistry) {
  registry.registerMany([
    ...EditorManifests,
  ]);
}
