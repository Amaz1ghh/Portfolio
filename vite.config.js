import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                competences: resolve(__dirname, "./pages/competences.html"),
                contact: resolve(__dirname, "./pages/contact.html"),
                projet1: resolve(__dirname, "./pages/projet1.html"),
                projet2: resolve(__dirname, "./pages/projet2.html"),
                projet3: resolve(__dirname, "./pages/projet3.html"),
                projet4: resolve(__dirname, "./pages/projet4.html"),
                projet5: resolve(__dirname, "./pages/projet5.html"),
                projet6: resolve(__dirname, "./pages/projet6.html"),
            },
        },
    },
});