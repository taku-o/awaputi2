import { readFileSync } from 'fs';
import { resolve } from 'path';

// ui-libraryのpackage.jsonからバージョンを読み取り
const uiLibraryPackageJson = JSON.parse(
  readFileSync(resolve(__dirname, '../../ui-library/package.json'), 'utf-8')
);

export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  async viteFinal(config) {
    // __UI_LIBRARY_VERSION__を定義
    config.define = {
      ...config.define,
      __UI_LIBRARY_VERSION__: JSON.stringify(uiLibraryPackageJson.version)
    };
    
    // MUI v5の"use client"ディレクティブによる警告を抑制
    config.build = {
      ...config.build,
      rollupOptions: {
        ...config.build?.rollupOptions,
        onwarn: (warning, warn) => {
          // MODULE_LEVEL_DIRECTIVE警告を抑制（MUIの"use client"対応）
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return;
          }
          warn(warning);
        }
      }
    };
    return config;
  }
};