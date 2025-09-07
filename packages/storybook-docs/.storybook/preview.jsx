import React from 'react';
import { BubblePopThemeProvider } from '@bubblepop/ui-library';

// Suppress act() warnings in Storybook
if (typeof global !== 'undefined') {
  global.IS_REACT_ACT_ENVIRONMENT = true;
}
if (typeof globalThis !== 'undefined') {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
}

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