import { defineConfig } from 'vite';
import { pluginName } from './src/constants';

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"]
    },
    //outDir: `../App_Plugins/${pluginName}`,                   // default location
    outDir: `../wwwroot/App_Plugins/${pluginName}`,             // direct to razor/wwwroot
    //outDir: `../../../web/wwwroot/App_Plugins/${pluginName}`, // direct to MultilanguageTextboxWeb for development
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [/^@umbraco/],
    },
    emitAssets: true,
    copyPublicDir: true
  },
});
