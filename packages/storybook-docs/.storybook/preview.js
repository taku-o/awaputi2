import { BubblePopThemeProvider } from '../../ui-library/src/providers/ThemeProvider';

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