import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/entry.ts", // your web component source file
            formats: ["es"],
            fileName: "entry-point", // the name of the built file
        },
        outDir: "../Our.Umbraco.MultilanguageTextbox.UI/wwwroot/App_Plugins/multilanguagetextbox", // all compiled files will be placed here
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            external: [/^@umbraco/], // ignore the Umbraco Backoffice package in the build
        },
    }   
});