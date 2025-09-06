# BubblePop テーマ・UIコンポーネント仕様

## 概要
BubblePopアプリケーションにおけるテーマとUIコンポーネントの実装仕様を定義します。MUI (Material-UI)をベースとした統一的なデザインシステムを構築し、一貫したユーザーエクスペリエンスを提供します。

## デザイントークン

### カラーパレット

#### プライマリカラー
```typescript
const primaryColors = {
  main: '#4CAF50',        // メインカラー（ゲームスタートボタン等）
  light: '#81C784',       // ライトバリエーション
  dark: '#388E3C',        // ダークバリエーション
  contrast: '#FFFFFF'     // コントラストカラー（白文字）
};
```

#### アクセントカラー
```typescript
const accentColors = {
  gold: '#FFD700',        // 金色（スコア表示、軌跡エフェクト）
  blue: '#4A90E2',        // 青色（通常泡、基本UI）
  red: '#FF6B6B',         // 赤色（コンボ表示、エラー）
  green: '#4CAF50',       // 緑色（成功、回復）
  orange: '#FF9800',      // オレンジ色（警告、購入不可）
  purple: '#9C27B0'       // 紫色（特殊効果）
};
```

#### テキストカラー
```typescript
const textColors = {
  primary: '#FFFFFF',     // メインテキスト（白）
  secondary: '#B0B0C0',   // サブテキスト（薄いグレー）
  disabled: '#808080',    // 無効テキスト（グレー）
  label: '#888888',       // ラベルテキスト（薄いグレー）
  accent: '#FFD700'       // アクセントテキスト（金色）
};
```

#### 背景色
```typescript
const backgroundColors = {
  primary: '#0F0F1E',     // メイン背景（濃い青）
  secondary: '#1A1A2E',   // セカンダリ背景
  surface: '#2A2A3E',     // サーフェス背景（カード等）
  overlay: '#3D3D55',     // オーバーレイ背景
  game: '#333344'         // ゲームエリア背景
};
```

#### 泡タイプ別カラー
```typescript
const bubbleColors = {
  normal: '#4A90E2',      // 通常泡（青）
  stone: '#808080',       // 石泡（グレー）
  iron: '#C0C0C0',        // 鉄泡（銀色）
  diamond: '#B0E0E6',     // ダイヤモンド泡（水色）
  rainbow: 'rainbow',     // 虹色泡（特殊レンダリング）
  pink: '#FF69B4',        // 回復泡（ピンク）
  poison: '#32CD32',      // 毒泡（緑）
  boss: '#8B0000',        // ボス泡（濃い赤）
  golden: '#FFD700',      // 黄金泡（金色）
  score: '#FFD700'        // スコア泡（金色）
};
```

### タイポグラフィ

#### フォントファミリー
```typescript
const fontFamilies = {
  main: 'Helvetica, Arial, sans-serif',           // メインフォント
  game: 'Courier New, monospace',                 // ゲーム用フォント（スコア、タイマー）
  title: 'Arial Black, Arial, sans-serif',       // タイトルフォント
  decorative: 'serif'                             // 装飾フォント
};
```

#### フォントサイズ
```typescript
const fontSizes = {
  // 見出し
  h1: '72px',           // メインタイトル
  h2: '48px',           // ページタイトル
  h3: '36px',           // セクションタイトル
  h4: '24px',           // サブセクションタイトル
  
  // 本文
  body: '16px',         // 通常テキスト
  bodyLarge: '20px',    // 大きなテキスト
  bodySmall: '14px',    // 小さなテキスト
  
  // ゲームUI
  score: '28px',        // スコア表示
  timer: '28px',        // タイマー表示
  combo: '28px',        // コンボ表示
  label: '12px',        // ラベル表示
  
  // ボタン
  button: '28px',       // ボタンテキスト
  buttonSmall: '16px',  // 小さなボタン
  
  // その他
  caption: '12px',      // キャプション
  version: '14px'       // バージョン情報
};
```

#### フォントウェイト
```typescript
const fontWeights = {
  light: 300,           // 細字
  regular: 400,         // 通常
  medium: 500,          // 中太
  bold: 700,            // 太字
  black: 900            // 極太（タイトル用）
};
```

#### 行間
```typescript
const lineHeights = {
  tight: 1.2,           // 密（タイトル）
  normal: 1.5,           // 通常（本文）
  relaxed: 1.8,          // 緩い（読み物）
  loose: 2.0             // 非常に緩い（特殊用途）
};
```

### スペーシング

#### 基本スペーシング単位
```typescript
const spacing = {
  xs: '4px',            // 極小
  sm: '8px',            // 小
  md: '16px',           // 中
  lg: '24px',           // 大
  xl: '32px',           // 特大
  xxl: '48px',          // 極大
  xxxl: '64px'          // 最大
};
```

#### コンポーネント間のマージン
```typescript
const componentMargins = {
  // セクション間
  section: '48px',      // セクション間のマージン
  subsection: '24px',   // サブセクション間のマージン
  
  // カード間
  card: '16px',         // カード間のマージン
  cardGroup: '24px',    // カードグループ間のマージン
  
  // ボタン間
  button: '8px',        // ボタン間のマージン
  buttonGroup: '16px',  // ボタングループ間のマージン
  
  // フォーム要素間
  formField: '16px',    // フォームフィールド間のマージン
  formGroup: '24px'     // フォームグループ間のマージン
};
```

#### コンポーネント内のパディング
```typescript
const componentPadding = {
  // ボタン
  button: {
    small: '8px 16px',    // 小さなボタン
    medium: '12px 24px',  // 中サイズボタン
    large: '16px 32px'    // 大きなボタン
  },
  
  // カード
  card: {
    small: '16px',        // 小さなカード
    medium: '24px',       // 中サイズカード
    large: '32px'         // 大きなカード
  },
  
  // コンテナ
  container: {
    small: '16px',        // 小さなコンテナ
    medium: '24px',       // 中サイズコンテナ
    large: '32px'         // 大きなコンテナ
  },
  
  // フォーム
  form: {
    field: '12px',        // フォームフィールド
    group: '16px'         // フォームグループ
  }
};
```

## MUIテーマ設定

### テーマ構成
```typescript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#FFD700',
      light: '#FFF176',
      dark: '#F57F17',
      contrastText: '#000000'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0C0',
      disabled: '#808080'
    },
    background: {
      default: '#0F0F1E',
      paper: '#2A2A3E'
    }
  },
  typography: {
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
      textTransform: 'none'
    }
  },
  spacing: 8, // 8pxを基本単位とする
  shape: {
    borderRadius: 8
  }
});
```

### カスタムコンポーネントスタイル
```typescript
const customComponents = {
  // ゲームスタートボタン
  GameStartButton: {
    styleOverrides: {
      root: {
        backgroundColor: '#4CAF50',
        color: '#FFFFFF',
        fontSize: '28px',
        fontWeight: 700,
        padding: '16px 32px',
        borderRadius: '50px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        '&:hover': {
          backgroundColor: '#45a049',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)'
        }
      }
    }
  },
  
  // ステージカード
  StageCard: {
    styleOverrides: {
      root: {
        backgroundColor: '#2A2A3E',
        color: '#FFFFFF',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #3D3D55',
        '&:hover': {
          backgroundColor: '#3D3D55',
          borderColor: '#4CAF50'
        }
      }
    }
  },
  
  // スコア表示
  ScoreDisplay: {
    styleOverrides: {
      root: {
        fontFamily: 'Courier New, monospace',
        fontSize: '28px',
        fontWeight: 700,
        color: '#FFD700',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
      }
    }
  }
};
```

## レスポンシブデザイン

### ブレークポイント
```typescript
const breakpoints = {
  xs: '0px',      // 極小画面
  sm: '600px',    // 小画面
  md: '900px',    // 中画面
  lg: '1200px',   // 大画面
  xl: '1536px'    // 特大画面
};
```

### レスポンシブスペーシング
```typescript
const responsiveSpacing = {
  // 画面サイズに応じたマージン調整
  section: {
    xs: '24px',   // 小画面
    sm: '32px',   // 中画面
    md: '48px',   // 大画面
    lg: '64px'    // 特大画面
  },
  
  // 画面サイズに応じたパディング調整
  container: {
    xs: '16px',   // 小画面
    sm: '24px',   // 中画面
    md: '32px',   // 大画面
    lg: '48px'    // 特大画面
  }
};
```

## 実装時の注意事項

### 1. カラーの一貫性
- 定義されたカラーパレットを厳密に使用
- カスタムカラーは追加しない
- アクセシビリティを考慮したコントラスト比の確保

### 2. タイポグラフィの統一
- フォントサイズは定義された値のみ使用
- フォントウェイトは適切に使い分け
- 行間は読みやすさを考慮して設定

### 3. スペーシングの規則性
- 8pxを基本単位としたスペーシングシステム
- コンポーネント間のマージンは統一
- レスポンシブ対応での適切な調整

### 4. MUIテーマの活用
- カスタムコンポーネントはMUIテーマを継承
- 一貫したスタイリングの実装
- テーマの変更による全体の色調調整

この仕様により、BubblePopアプリケーションの統一されたデザインシステムを実現します。
