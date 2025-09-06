import { Breakpoints } from '@mui/material/styles';

// 8pxベースのスペーシングシステム
export const spacingConfig = {
  // 基本単位: 8px
  unit: 8,
  
  // スペーシング倍率
  xs: 0.5,    // 4px
  sm: 1,      // 8px
  md: 2,      // 16px
  lg: 3,      // 24px
  xl: 4,      // 32px
  xxl: 6,     // 48px
  xxxl: 8     // 64px
};

// シェイプ設定
export const shapeConfig = {
  borderRadius: 8  // 8px
};

// レスポンシブブレークポイント
export const breakpointsConfig: Partial<Breakpoints> = {
  values: {
    xs: 0,       // 極小画面
    sm: 600,     // 小画面
    md: 900,     // 中画面
    lg: 1200,    // 大画面
    xl: 1536     // 特大画面
  }
};