import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import { resolve } from 'path';
import { readFileSync } from 'fs';

// ui-libraryのpackage.jsonからバージョンを読み取り
const uiLibraryPackageJson = JSON.parse(
  readFileSync(resolve(__dirname, '../ui-library/package.json'), 'utf-8')
);

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  define: {
    // ui-libraryのバージョンを注入（開発時）
    __UI_LIBRARY_VERSION__: JSON.stringify(uiLibraryPackageJson.version),
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // 開発時はui-libraryのソースを直接参照
      '@bubblepop/ui-library': resolve(__dirname, '../ui-library/src'),
    },
  },
  server: {
    port: 3000,
    // ui-libraryの変更を監視
    watch: {
      ignored: ['!**/node_modules/@bubblepop/ui-library/**'],
    },
  },
  build: {
    outDir: 'dist',
  },
  optimizeDeps: {
    // ui-libraryを事前バンドルから除外（開発時）
    exclude: ['@bubblepop/ui-library'],
  },
});