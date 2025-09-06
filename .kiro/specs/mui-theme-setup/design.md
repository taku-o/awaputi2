# Design Document

## Overview

BubblePopアプリケーションのUIライブラリにMUI (Material-UI)テーマシステムを実装します。統一されたデザインシステムを提供し、一貫したユーザーエクスペリエンスを実現するためのテーマ設定を構築します。

## Architecture

### テーマシステム構成

```
packages/ui-library/src/
├── theme/
│   ├── index.ts          # テーマのメインエクスポート
│   ├── palette.ts        # カラーパレット定義
│   ├── typography.ts     # タイポグラフィ設定
│   ├── spacing.ts        # スペーシング設定
│   └── components.ts     # カスタムコンポーネントスタイル
├── providers/
│   └── ThemeProvider.tsx # テーマプロバイダーコンポーネント
└── index.ts              # ライブラリメインエクスポート
```

### 依存関係

```json
{
  "dependencies": {
    "@mui/material": "^5.14.0",
    "@mui/system": "^5.14.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0"
  }
}
```

## Components and Interfaces

### 1. テーマオブジェクト (theme/index.ts)

```typescript
import { createTheme, Theme } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { spacing } from './spacing';
import { components } from './components';

export const bubblePopTheme: Theme = createTheme({
  palette,
  typography,
  spacing: 8, // 8pxベース
  shape: {
    borderRadius: 8
  },
  components
});

export type BubblePopTheme = typeof bubblePopTheme;
```

### 2. カラーパレット (theme/palette.ts)

```typescript
import { PaletteOptions } from '@mui/material/styles';

export const palette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#4CAF50',        // メインカラー
    light: '#81C784',       // ライトバリエーション
    dark: '#388E3C',        // ダークバリエーション
    contrastText: '#FFFFFF' // コントラストカラー
  },
  secondary: {
    main: '#FFD700',        // アクセントカラー（金色）
    light: '#FFF176',       // ライトバリエーション
    dark: '#F57F17',        // ダークバリエーション
    contrastText: '#000000' // コントラストカラー
  },
  text: {
    primary: '#FFFFFF',     // メインテキスト
    secondary: '#B0B0C0',   // サブテキスト
    disabled: '#808080'     // 無効テキスト
  },
  background: {
    default: '#0F0F1E',     // メイン背景
    paper: '#2A2A3E'        // サーフェス背景
  },
  error: {
    main: '#FF6B6B'         // エラーカラー
  },
  warning: {
    main: '#FF9800'         // 警告カラー
  },
  info: {
    main: '#4A90E2'         // 情報カラー
  },
  success: {
    main: '#4CAF50'         // 成功カラー
  }
};
```

### 3. タイポグラフィ (theme/typography.ts)

```typescript
import { TypographyOptions } from '@mui/material/styles/createTypography';

export const typography: TypographyOptions = {
  fontFamily: 'Helvetica, Arial, sans-serif',
  h1: {
    fontSize: '72px',
    fontWeight: 900,
    lineHeight: 1.2,
    color: '#FFFFFF'
  },
  h2: {
    fontSize: '48px',
    fontWeight: 700,
    lineHeight: 1.2,
    color: '#FFFFFF'
  },
  h3: {
    fontSize: '36px',
    fontWeight: 700,
    lineHeight: 1.2,
    color: '#FFFFFF'
  },
  h4: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: 1.3,
    color: '#FFFFFF'
  },
  body1: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#FFFFFF'
  },
  body2: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#B0B0C0'
  },
  button: {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: 1.2,
    textTransform: 'none' as const
  },
  caption: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.4,
    color: '#888888'
  }
};
```

### 4. スペーシング設定 (theme/spacing.ts)

```typescript
// 8pxベースのスペーシングシステム
// MUIのデフォルトspacing関数を使用
// spacing(1) = 8px, spacing(2) = 16px, etc.

export const spacingConfig = {
  unit: 8, // 基本単位
  
  // よく使用されるスペーシング値
  xs: 1,   // 8px
  sm: 2,   // 16px
  md: 3,   // 24px
  lg: 4,   // 32px
  xl: 6,   // 48px
  xxl: 8   // 64px
};
```

### 5. カスタムコンポーネントスタイル (theme/components.ts)

```typescript
import { Components, Theme } from '@mui/material/styles';

export const components: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '50px',
        padding: '16px 32px',
        fontSize: '28px',
        fontWeight: 700,
        textTransform: 'none',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        '&:hover': {
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)'
        }
      }
    }
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: '#2A2A3E',
        border: '1px solid #3D3D55',
        borderRadius: '12px',
        '&:hover': {
          backgroundColor: '#3D3D55',
          borderColor: '#4CAF50'
        }
      }
    }
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        color: '#FFFFFF'
      }
    }
  }
};
```

### 6. テーマプロバイダー (providers/ThemeProvider.tsx)

```typescript
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
```

## Data Models

### テーマ型定義

```typescript
// theme/types.ts
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
```

## Error Handling

### テーマ読み込みエラー

```typescript
// theme/index.ts
export const createBubblePopTheme = () => {
  try {
    return createTheme({
      palette,
      typography,
      spacing: 8,
      shape: { borderRadius: 8 },
      components
    });
  } catch (error) {
    console.error('Failed to create BubblePop theme:', error);
    // フォールバックテーマを返す
    return createTheme({
      palette: { mode: 'dark' }
    });
  }
};
```

### TypeScript型エラー対応

```typescript
// theme/augmentation.ts
declare module '@mui/material/styles' {
  interface Theme {
    bubblePop?: BubblePopThemeConfig;
  }
  
  interface ThemeOptions {
    bubblePop?: Partial<BubblePopThemeConfig>;
  }
}
```

## Testing Strategy

### 1. ユニットテスト

```typescript
// tests/theme.test.ts
import { bubblePopTheme } from '../src/theme';

describe('BubblePop Theme', () => {
  test('should have correct primary color', () => {
    expect(bubblePopTheme.palette.primary.main).toBe('#4CAF50');
  });
  
  test('should have correct typography settings', () => {
    expect(bubblePopTheme.typography.h1?.fontSize).toBe('72px');
    expect(bubblePopTheme.typography.fontFamily).toContain('Helvetica');
  });
  
  test('should have 8px spacing unit', () => {
    expect(bubblePopTheme.spacing(1)).toBe('8px');
  });
});
```

### 2. コンポーネントテスト

```typescript
// tests/ThemeProvider.test.tsx
import { render } from '@testing-library/react';
import { BubblePopThemeProvider } from '../src/providers/ThemeProvider';
import { Typography } from '@mui/material';

describe('BubblePopThemeProvider', () => {
  test('should apply theme to children', () => {
    const { getByText } = render(
      <BubblePopThemeProvider>
        <Typography variant="h1">Test</Typography>
      </BubblePopThemeProvider>
    );
    
    const element = getByText('Test');
    expect(element).toHaveStyle('color: #FFFFFF');
  });
});
```

### 3. 統合テスト

```typescript
// tests/integration.test.tsx
import { render } from '@testing-library/react';
import { Button, Card, Typography } from '@mui/material';
import { BubblePopThemeProvider } from '../src/providers/ThemeProvider';

describe('Theme Integration', () => {
  test('should apply consistent styling across components', () => {
    const { container } = render(
      <BubblePopThemeProvider>
        <Card>
          <Typography variant="h2">Title</Typography>
          <Button variant="contained">Action</Button>
        </Card>
      </BubblePopThemeProvider>
    );
    
    // テーマが適用されていることを確認
    expect(container.querySelector('.MuiCard-root')).toHaveStyle(
      'background-color: #2A2A3E'
    );
  });
});
```

## Implementation Notes

### パッケージ更新

1. **package.json更新**: MUI関連の依存関係を追加
2. **TypeScript設定**: MUIの型定義を適切に設定
3. **ビルド設定**: テーマファイルが適切にバンドルされるよう設定

### エクスポート構成

```typescript
// src/index.ts
export { bubblePopTheme, createBubblePopTheme } from './theme';
export { BubblePopThemeProvider } from './providers/ThemeProvider';
export type { BubblePopTheme, BubblePopThemeConfig } from './theme/types';

// 既存のエクスポートも維持
export * from './components';
```

### 開発時の考慮事項

1. **パフォーマンス**: テーマオブジェクトの作成は一度だけ行う
2. **拡張性**: 将来的なカスタマイゼーションを考慮した設計
3. **一貫性**: docs/design/theme_ui_component_spec.mdの仕様に厳密に従う
4. **型安全性**: TypeScriptの型定義を活用した安全な実装