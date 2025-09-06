import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { bubblePopTheme } from '../theme';

interface BubblePopThemeProviderProps {
  children: React.ReactNode;
}

export const BubblePopThemeProvider: React.FC<BubblePopThemeProviderProps> = ({ 
  children 
}) => {
  return (
    <MuiThemeProvider theme={bubblePopTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};