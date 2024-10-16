import {defineConfig} from 'vite';

export default defineConfig({
    build: {
        outDir: 'build',
        target: 'es2015',
        rollupOptions: {
            input: {
                main: 'index.html',
                delegate: 'delegatePage.html'
            },
        },
    },
});
