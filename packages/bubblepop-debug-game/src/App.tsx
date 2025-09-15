import React from 'react';
import { BubblePopThemeProvider } from '@bubblepop/ui-library';
import { Router } from './router/Router';

export const App: React.FC = () => {
  return (
    <BubblePopThemeProvider>
      <Router />
    </BubblePopThemeProvider>
  );
};