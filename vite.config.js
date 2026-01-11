import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                projet: resolve(__dirname, "projets.html"),
                contact: resolve(__dirname, "contact.html"),
            },
        },
    },
});