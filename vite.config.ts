import { defineConfig } from 'vite';
import { terser } from 'rollup-plugin-terser';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    ...(mode === 'production' ? { define: { 'process.env.NODE_ENV': '"production"' } } : {}),
    ...{
        server: {
            open: './test/index.html',
        },
        plugins: [react(), dts()],
        build: {
            minify: 'terser',
            lib: {
                entry: path.resolve(__dirname, 'src/index.ts'),
                name: 'alwan',
                fileName(format) {
                    const fileName = 'react-alwan.js';
                    if (format === 'umd') {
                        return 'umd/' + fileName;
                    }
                    return fileName;
                },
            },
            sourcemap: true,
            emptyOutDir: true,
            rollupOptions: {
                plugins: [terser()],
                external: ['react', 'react-dom'],

                output: {
                    assetFileNames() {
                        return 'alwan.css';
                    },
                    globals: {
                        react: 'React'
                    },
                },
            },
        },
    },
}));
