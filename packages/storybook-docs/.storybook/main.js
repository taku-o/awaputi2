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
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-viewport'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  viteFinal: async (config) => {
    // __UI_LIBRARY_VERSION__を定義
    config.define = {
      ...config.define,
      __UI_LIBRARY_VERSION__: JSON.stringify(uiLibraryPackageJson.version)
    };
    return config;
  }
};