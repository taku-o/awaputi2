import React from 'react';
import { BubblePopThemeProvider } from '@bubblepop/ui-library';

// Storybookの内部コンポーネントから発生するact()警告を無視する
// これは、根本的な解決策ではないが、開発体験を向上させるための現実的な対処法
const originalConsoleError = console.error;
console.error = (...args) => {
  if (/(React)?"act(...)"/.test(args[0])) {
    return;
  }
  originalConsoleError(...args);
};

export const decorators = [
  (Story) => (
    <BubblePopThemeProvider>
      <Story />
    </BubblePopThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
