import { createTheme, Theme } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { components } from './components';
import { spacingConfig, shapeConfig, breakpointsConfig } from './spacing';

export const bubblePopTheme: Theme = createTheme({
  palette,
  typography,
  spacing: spacingConfig.unit, // 8pxベースのスペーシングシステム
  shape: shapeConfig,
  breakpoints: breakpointsConfig,
  components
});

export type BubblePopTheme = typeof bubblePopTheme;