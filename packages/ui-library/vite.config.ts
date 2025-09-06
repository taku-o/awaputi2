import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { readFileSync } from 'fs';

// package.jsonからバージョンを読み取り
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default defineConfig(() => ({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      skipDiagnostics: false,
    }),
  ],
  define: {
    // バージョンを自動注入（開発時・本番時共通）
    __UI_LIBRARY_VERSION__: JSON.stringify(packageJson.version),
  },
  // 依存関係事前バンドリングの最適化と警告解消
  optimizeDeps: {
    include: ['@mui/material', '@mui/system', '@emotion/react', '@emotion/styled'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UILibrary',
      formats: ['es', 'umd'],
      fileName: (format): string => `ui-library.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}));