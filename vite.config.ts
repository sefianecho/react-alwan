import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    ...(mode === "production"
        ? { define: { "process.env.NODE_ENV": '"production"' } }
        : {}),
    ...{
        server: {
            open: "./dev/index.html",
        },
        plugins: [react(), dts()],
        build: {
            lib: {
                entry: "alwan",
                formats: ["es", "cjs"],
                fileName: (format) => `react-alwan.${format}.js`,
            },
            emptyOutDir: true,
            rollupOptions: {
                external: ["react", "react-dom"],
                output: {
                    assetFileNames: "react-alwan.css",
                },
            },
        },
    },
}));
