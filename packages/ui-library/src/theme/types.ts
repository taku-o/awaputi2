import { Theme } from '@mui/material/styles';

export interface BubblePopThemeConfig {
  palette: {
    primary: string;
    secondary: string;
    background: {
      default: string;
      paper: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
  };
  typography: {
    fontFamily: string;
    sizes: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      body1: string;
      body2: string;
      button: string;
    };
  };
  spacing: {
    unit: number;
  };
}

export type ExtendedTheme = Theme & {
  bubblePop?: BubblePopThemeConfig;
};

// MUIテーマの型拡張
declare module '@mui/material/styles' {
  interface Theme {
    bubblePop?: BubblePopThemeConfig;
  }
  
  interface ThemeOptions {
    bubblePop?: Partial<BubblePopThemeConfig>;
  }
}