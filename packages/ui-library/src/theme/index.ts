import { createTheme, Theme } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { components } from './components';

export const bubblePopTheme: Theme = createTheme({
  palette,
  typography,
  spacing: 8, 
  shape: {
    borderRadius: 8
  },
  components
});

export type BubblePopTheme = typeof bubblePopTheme;