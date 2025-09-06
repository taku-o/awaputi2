# Design Document

## Overview

Phase 3では、BubblePopアプリケーションの基盤となる3つの基本UIコンポーネント（Button、Card、Container）を実装します。これらのコンポーネントは、既存のMUIテーマシステムと統合し、統一されたデザイン言語を提供します。

## Architecture

### Component Structure
```
packages/ui-library/src/components/
├── Button/
│   ├── Button.tsx          # メインコンポーネント
│   ├── Button.types.ts     # 型定義
│   └── index.ts           # エクスポート
├── Card/
│   ├── Card.tsx           # メインコンポーネント
│   ├── Card.types.ts      # 型定義
│   └── index.ts          # エクスポート
├── Container/
│   ├── Container.tsx      # メインコンポーネント
│   ├── Container.types.ts # 型定義
│   └── index.ts          # エクスポート
└── index.ts              # 全コンポーネントのエクスポート
```

### Theme Integration
各コンポーネントは、既存の`packages/ui-library/src/theme/`システムと統合し、以下の要素を活用します：
- `palette.ts`: カラーパレット
- `typography.ts`: フォント設定
- `spacing.ts`: スペーシング設定
- `components.ts`: コンポーネント固有のスタイル

## Components and Interfaces

### Button Component

#### Interface
```typescript
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}
```

#### Design Specifications
- **Primary Variant**: `#4CAF50` 背景、白文字、28px フォントサイズ
- **Secondary Variant**: `#FFD700` 背景、黒文字、28px フォントサイズ  
- **Icon Variant**: 透明背景、アイコンのみ表示
- **Disabled State**: 60% 透明度、クリック無効
- **Hover Effect**: 背景色を5%暗く、影を強化
- **Border Radius**: 8px（small）、12px（medium）、16px（large）
- **Padding**: small: 8px 16px、medium: 12px 24px、large: 16px 32px

### Card Component

#### Interface
```typescript
export interface CardProps {
  children: React.ReactNode;
  elevation?: 0 | 1 | 2 | 3 | 4;
  hoverable?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  padding?: 'none' | 'small' | 'medium' | 'large';
  variant?: 'default' | 'outlined';
}
```

#### Design Specifications
- **Background**: `#2A2A3E`（surface color）
- **Border**: `1px solid #3D3D55`（outlined variant）
- **Border Radius**: 12px
- **Elevation**: 0-4レベルの影効果
- **Hover Effect**: 背景色を`#3D3D55`に変更、ボーダーを`#4CAF50`に変更
- **Padding**: none: 0、small: 16px、medium: 24px、large: 32px

### Container Component

#### Interface
```typescript
export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  center?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  responsive?: boolean;
}
```

#### Design Specifications
- **Max Widths**: xs: 444px、sm: 600px、md: 900px、lg: 1200px、xl: 1536px
- **Center**: margin: 0 auto で中央揃え
- **Responsive Padding**: 
  - xs: 16px、sm: 24px、md: 32px、lg: 48px
- **Base Padding**: none: 0、small: 16px、medium: 24px、large: 32px

## Data Models

### Theme Integration Types
```typescript
// テーマから取得する色定義
interface ThemeColors {
  primary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
}

// スペーシング定義
interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
}
```

## Error Handling

### Component Error Boundaries
各コンポーネントは以下のエラーハンドリングを実装：

1. **Props Validation**: TypeScriptによる型チェック
2. **Default Props**: 必須でないプロパティのデフォルト値設定
3. **Event Handler Safety**: イベントハンドラーの存在チェック
4. **Children Validation**: childrenプロパティの適切な処理

### Error States
```typescript
// ボタンコンポーネントのエラーハンドリング例
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(event);
  };

  return (
    <button
      {...props}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
```

## Testing Strategy

### Unit Testing Approach
各コンポーネントに対して以下のテストを実装：

#### Button Component Tests
1. **Rendering Tests**: 各variantの正常な描画
2. **Interaction Tests**: クリックイベントの発火
3. **State Tests**: disabled状態の動作
4. **Props Tests**: 各プロパティの適用確認

#### Card Component Tests
1. **Rendering Tests**: 各elevationレベルの描画
2. **Interaction Tests**: hoverable時のホバー効果
3. **Layout Tests**: paddingの適用確認
4. **Event Tests**: onClickハンドラーの動作

#### Container Component Tests
1. **Layout Tests**: maxWidthの適用確認
2. **Responsive Tests**: レスポンシブパディングの動作
3. **Centering Tests**: center プロパティの効果
4. **Children Tests**: 子要素の正常な描画

### Test File Structure
```
packages/ui-library/tests/
├── Button.test.tsx
├── Card.test.tsx
├── Container.test.tsx
└── integration.test.tsx  # 既存ファイル
```

### Testing Tools
- **Jest**: テストランナー
- **React Testing Library**: コンポーネントテスト
- **@testing-library/user-event**: ユーザーインタラクションテスト

## Implementation Notes

### MUI Theme Integration
各コンポーネントは`useTheme`フックを使用してテーマ値にアクセス：

```typescript
import { useTheme } from '@mui/material/styles';

const Button: React.FC<ButtonProps> = (props) => {
  const theme = useTheme();
  
  const styles = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    // ...
  };
  
  return <button style={styles}>{props.children}</button>;
};
```

### Performance Considerations
- **Memoization**: React.memo を使用して不要な再レンダリングを防止
- **Style Optimization**: CSS-in-JS の最適化
- **Bundle Size**: 必要なMUIコンポーネントのみをインポート

### Accessibility
- **ARIA Labels**: 適切なaria属性の設定
- **Keyboard Navigation**: キーボード操作のサポート
- **Focus Management**: フォーカス状態の視覚的表示
- **Color Contrast**: WCAG 2.1 AA準拠のコントラスト比