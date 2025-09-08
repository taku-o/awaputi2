# MUIベースコンポーネント移行ガイド

## 概要

現在の独自実装コンポーネント（Button、Card、Container）をMUIベースの実装に移行するための詳細ガイドです。

## 移行の理由

### 現在の問題点
- **アクセシビリティ不備**: ARIA属性、キーボードナビゲーション、スクリーンリーダー対応が不足
- **ユーザビリティ低下**: ripple効果、focus管理、hover状態などの標準的なUXが欠如
- **保守性の問題**: 独自実装のバグ修正、機能追加を全て自前で対応
- **テスト負荷**: ブラウザ互換性、アクセシビリティを全て自前でテスト

### 移行後の利点
- **標準準拠**: WCAG準拠のアクセシビリティ
- **豊富な機能**: ripple効果、focus管理、キーボードナビゲーション
- **保守性向上**: MUIのアップデートで自動的に改善
- **開発効率**: 実装済み機能の活用

## 移行手順

### 1. Buttonコンポーネントの移行

#### 現在の実装（修正前）
```typescript
// packages/ui-library/src/components/Button/Button.tsx
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  disabled = false, 
  children, 
  onClick,
  ...props 
}) => {
  const theme = useTheme();

  const getButtonStyles = () => {
    const baseStyles = {
      padding: theme.spacing(1, 2),
      borderRadius: theme.shape.borderRadius,
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: theme.typography.button.fontSize,
      fontWeight: theme.typography.button.fontWeight,
      textTransform: theme.typography.button.textTransform,
      transition: 'all 0.2s ease-in-out',
      opacity: disabled ? 0.6 : 1,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        };
      case 'secondary':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: theme.palette.primary.main,
          border: `1px solid ${theme.palette.primary.main}`,
        };
      case 'icon':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
          minWidth: 'auto',
          padding: theme.spacing(1),
        };
      default:
        return baseStyles;
    }
  };

  return (
    <button
      style={getButtonStyles()}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
```

#### 新しい実装（修正後）
```typescript
// packages/ui-library/src/components/Button/Button.tsx
import React from 'react';
import { Button as MuiButton, styled } from '@mui/material';
import { ButtonProps } from './Button.types';

// カスタムスタイリングが必要な場合のみ使用
const StyledButton = styled(MuiButton)(({ theme }) => ({
  // ゲーム特有のスタイルがあれば追加
  textTransform: 'none', // MUIのデフォルトの大文字変換を無効化
  borderRadius: theme.spacing(1), // カスタムボーダーラディウス
}));

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  disabled = false, 
  children, 
  onClick,
  ...props 
}) => {
  // variantをMUIの形式に変換
  const getMuiVariant = () => {
    switch (variant) {
      case 'primary':
        return 'contained';
      case 'secondary':
        return 'outlined';
      case 'icon':
        return 'text';
      default:
        return 'contained';
    }
  };

  return (
    <StyledButton
      variant={getMuiVariant()}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};
```

#### 型定義の更新
```typescript
// packages/ui-library/src/components/Button/Button.types.ts
import { ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'icon';
}
```

### 2. Cardコンポーネントの移行

#### 現在の実装（修正前）
```typescript
// packages/ui-library/src/components/Card/Card.tsx
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { CardProps } from './Card.types';

export const Card: React.FC<CardProps> = ({ 
  elevation = 1, 
  hoverable = false, 
  children, 
  onClick,
  ...props 
}) => {
  const theme = useTheme();

  const getCardStyles = () => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[elevation],
    padding: theme.spacing(2),
    cursor: onClick ? 'pointer' : 'default',
    transition: 'box-shadow 0.2s ease-in-out',
    '&:hover': hoverable ? {
      boxShadow: theme.shadows[Math.min(elevation + 2, 24)],
    } : {},
  });

  return (
    <div
      style={getCardStyles()}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
```

#### 新しい実装（修正後）
```typescript
// packages/ui-library/src/components/Card/Card.tsx
import React from 'react';
import { Card as MuiCard, CardContent, styled } from '@mui/material';
import { CardProps } from './Card.types';

const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) => prop !== 'hoverable',
})<{ hoverable?: boolean }>(({ theme, hoverable }) => ({
  cursor: hoverable ? 'pointer' : 'default',
  transition: theme.transitions.create(['box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  ...(hoverable && {
    '&:hover': {
      boxShadow: theme.shadows[8],
    },
  }),
}));

export const Card: React.FC<CardProps> = ({ 
  elevation = 1, 
  hoverable = false, 
  children, 
  onClick,
  ...props 
}) => {
  return (
    <StyledCard
      elevation={elevation}
      hoverable={hoverable}
      onClick={onClick}
      {...props}
    >
      <CardContent>
        {children}
      </CardContent>
    </StyledCard>
  );
};
```

#### 型定義の更新
```typescript
// packages/ui-library/src/components/Card/Card.types.ts
import { CardProps as MuiCardProps } from '@mui/material';

export interface CardProps extends MuiCardProps {
  hoverable?: boolean;
}
```

### 3. Containerコンポーネントの移行

#### 現在の実装（修正前）
```typescript
// packages/ui-library/src/components/Container/Container.tsx
import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { ContainerProps } from './Container.types';

export const Container: React.FC<ContainerProps> = ({ 
  maxWidth = 'lg', 
  center = true, 
  padding = 2, 
  children, 
  ...props 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getMaxWidth = () => {
    switch (maxWidth) {
      case 'xs':
        return theme.breakpoints.values.xs;
      case 'sm':
        return theme.breakpoints.values.sm;
      case 'md':
        return theme.breakpoints.values.md;
      case 'lg':
        return theme.breakpoints.values.lg;
      case 'xl':
        return theme.breakpoints.values.xl;
      default:
        return maxWidth;
    }
  };

  const getContainerStyles = () => ({
    maxWidth: getMaxWidth(),
    margin: center ? '0 auto' : '0',
    padding: theme.spacing(isMobile ? padding / 2 : padding),
    width: '100%',
  });

  return (
    <div
      style={getContainerStyles()}
      {...props}
    >
      {children}
    </div>
  );
};
```

#### 新しい実装（修正後）
```typescript
// packages/ui-library/src/components/Container/Container.tsx
import React from 'react';
import { Container as MuiContainer, styled } from '@mui/material';
import { ContainerProps } from './Container.types';

const StyledContainer = styled(MuiContainer, {
  shouldForwardProp: (prop) => prop !== 'center' && prop !== 'padding',
})<{ center?: boolean; padding?: number }>(({ theme, center, padding = 2 }) => ({
  ...(center === false && {
    marginLeft: 0,
    marginRight: 0,
  }),
  padding: theme.spacing(padding),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(padding / 2),
  },
}));

export const Container: React.FC<ContainerProps> = ({ 
  maxWidth = 'lg', 
  center = true, 
  padding = 2, 
  children, 
  ...props 
}) => {
  return (
    <StyledContainer
      maxWidth={maxWidth}
      center={center}
      padding={padding}
      {...props}
    >
      {children}
    </StyledContainer>
  );
};
```

#### 型定義の更新
```typescript
// packages/ui-library/src/components/Container/Container.types.ts
import { ContainerProps as MuiContainerProps } from '@mui/material';

export interface ContainerProps extends MuiContainerProps {
  center?: boolean;
  padding?: number;
}
```

## 移行後のテスト更新

### 1. Buttonテストの更新
```typescript
// packages/ui-library/tests/Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../src/components/Button';
import { BubblePopThemeProvider } from '../src/providers/ThemeProvider';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <BubblePopThemeProvider>
      {component}
    </BubblePopThemeProvider>
  );
};

describe('Button Component', () => {
  test('renders primary button correctly', () => {
    renderWithTheme(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByRole('button', { name: /primary button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('MuiButton-contained'); // MUIクラスの確認
  });

  test('renders secondary button correctly', () => {
    renderWithTheme(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole('button', { name: /secondary button/i });
    expect(button).toHaveClass('MuiButton-outlined');
  });

  test('renders icon button correctly', () => {
    renderWithTheme(<Button variant="icon">🎮</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-text');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('disables button when disabled prop is true', () => {
    renderWithTheme(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  // MUI固有の機能テスト
  test('has proper accessibility attributes', () => {
    renderWithTheme(<Button>Accessible Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toHaveAttribute('aria-disabled');
  });
});
```

## 移行チェックリスト

### 事前準備
- [ ] 現在のコンポーネントの動作を理解
- [ ] 既存テストの実行と結果確認
- [ ] MUIドキュメントの確認

### Button移行
- [ ] MUI Buttonコンポーネントのインポート
- [ ] variant変換ロジックの実装
- [ ] カスタムスタイリングの適用
- [ ] 型定義の更新
- [ ] テストの更新と実行

### Card移行
- [ ] MUI Card、CardContentコンポーネントのインポート
- [ ] hoverable機能の実装
- [ ] elevation機能の確認
- [ ] 型定義の更新
- [ ] テストの更新と実行

### Container移行
- [ ] MUI Containerコンポーネントのインポート
- [ ] center、padding機能の実装
- [ ] レスポンシブ対応の確認
- [ ] 型定義の更新
- [ ] テストの更新と実行

### 最終確認
- [ ] 全テストの実行と成功確認
- [ ] Storybookでの動作確認
- [ ] アクセシビリティの確認
- [ ] ブラウザ互換性の確認

## トラブルシューティング

### よくある問題と解決策

#### 1. スタイルが適用されない
```typescript
// 問題: styled-componentsのpropsが正しく渡されない
const StyledButton = styled(MuiButton)<{ customProp: boolean }>(({ theme, customProp }) => ({
  // customPropが undefined になる
}));

// 解決策: shouldForwardPropを使用
const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'customProp',
})<{ customProp: boolean }>(({ theme, customProp }) => ({
  // customPropが正しく渡される
}));
```

#### 2. 型エラーが発生する
```typescript
// 問題: MUIのpropsと独自propsの競合
interface ButtonProps extends MuiButtonProps {
  variant: 'primary' | 'secondary'; // MUIのvariantと競合
}

// 解決策: Omitを使用して競合するpropsを除外
interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'icon';
}
```

#### 3. テストが失敗する
```typescript
// 問題: MUIクラス名の変更でテストが失敗
expect(button).toHaveClass('custom-button-primary');

// 解決策: MUIクラス名を使用するか、role/aria属性でテスト
expect(button).toHaveClass('MuiButton-contained');
// または
expect(button).toHaveAttribute('aria-label', 'Primary button');
```

## 参考資料

- [MUI Button Documentation](https://mui.com/material-ui/react-button/)
- [MUI Card Documentation](https://mui.com/material-ui/react-card/)
- [MUI Container Documentation](https://mui.com/material-ui/react-container/)
- [MUI Styling Documentation](https://mui.com/system/styled/)
- [MUI TypeScript Guide](https://mui.com/material-ui/guides/typescript/)