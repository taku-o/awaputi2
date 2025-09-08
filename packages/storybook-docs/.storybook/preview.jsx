import React from 'react';
import { BubblePopThemeProvider } from '@bubblepop/ui-library';

// Storybookの内部コンポーネントから発生するact()警告を無視する
// これは、根本的な解決策ではないが、開発体験を向上させるための現実的な対処法
const originalConsoleError = console.error;
console.error = (...args) => {
  // act()関連の警告を広範囲にキャッチ
  if (typeof args[0] === 'string' && 
      (args[0].includes('act(') || 
       args[0].includes('act ') ||
       args[0].includes('testing environment is not configured'))) {
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
