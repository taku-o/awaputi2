import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { readFileSync } from 'fs';

// ui-libraryのpackage.jsonからバージョンを読み取り
const uiLibraryPackageJson = JSON.parse(
  readFileSync(resolve(__dirname, '../ui-library/package.json'), 'utf-8')
);

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_DEBUG_PORT!),
    host: true,
    strictPort: true, // ポート8001が使用中なら失敗させる
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      // ui-libraryのソースを直接参照
      '@bubblepop/ui-library': resolve(__dirname, '../ui-library/src'),
    },
  },
  define: {
    '__UI_LIBRARY_VERSION__': JSON.stringify(uiLibraryPackageJson.version),
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  optimizeDeps: {
    // ui-libraryを事前バンドルから除外（開発時）
    exclude: ['@bubblepop/ui-library'],
    // MUI依存関係を明示的に含める
    include: ['@mui/material', '@mui/system', '@emotion/react', '@emotion/styled'],
  },
});