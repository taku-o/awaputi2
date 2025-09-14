# Design Document

## Overview

Phase 7では、BubblePopアプリケーションのページルーティング機能を実装します。React Router v6を使用して、各画面間の遷移を管理し、Single Page Applicationとしての基本機能を提供します。これにより、ユーザーは各画面間をスムーズに移動でき、ブラウザの戻るボタンやURL直接アクセスにも対応できます。

## Architecture

### ルーティングアーキテクチャ

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React         │    │   React Router  │    │   Page          │
│   App           │◄──►│   v6            │◄──►│   Components    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Browser       │    │   URL           │    │   Navigation    │
│   History       │    │   Management    │    │   Components    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### ルート構造

```
/ (タイトル画面)
├── /main (メイン画面)
├── /game/:stageId (ゲームプレイ画面)
├── /result (プレイ結果画面)
├── /account (アカウント情報画面)
├── /help (ヘルプ画面)
│   └── /help/:category/:topic (ヘルプ詳細画面)
├── /shop (ショップ画面)
│   └── /shop/:itemId (アイテム詳細画面)
└── /settings (設定画面)
```

## Components and Interfaces

### ルーター設定

```typescript
// packages/bubblepop/src/router/Router.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/game/:stageId" element={<GamePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/help/:category/:topic" element={<HelpDetailPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:itemId" element={<ItemDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
```

### ページコンポーネント

#### タイトル画面
```typescript
// packages/bubblepop/src/pages/TitlePage.tsx
export const TitlePage: React.FC = () => {
  return (
    <Container maxWidth="md" center>
      <Card elevation={2}>
        <h1>BubblePop</h1>
        <Button 
          variant="primary" 
          onClick={() => navigate('/main')}
        >
          ゲームスタート
        </Button>
      </Card>
    </Container>
  );
};
```

#### メイン画面
```typescript
// packages/bubblepop/src/pages/MainPage.tsx
export const MainPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <h1>メイン画面</h1>
      <Navigation />
    </Container>
  );
};
```

#### ゲームプレイ画面
```typescript
// packages/bubblepop/src/pages/GamePage.tsx
import { useParams } from 'react-router-dom';

export const GamePage: React.FC = () => {
  const { stageId } = useParams<{ stageId: string }>();
  
  return (
    <Container maxWidth="lg">
      <h1>ゲームプレイ画面 - ステージ: {stageId}</h1>
      <Navigation />
    </Container>
  );
};
```

#### プレイ結果画面
```typescript
// packages/bubblepop/src/pages/ResultPage.tsx
export const ResultPage: React.FC = () => {
  return (
    <Container maxWidth="md" center>
      <Card elevation={2}>
        <h1>プレイ結果</h1>
        <Button 
          variant="primary" 
          onClick={() => navigate('/main')}
        >
          メニューに戻る
        </Button>
      </Card>
    </Container>
  );
};
```

#### アカウント情報画面
```typescript
// packages/bubblepop/src/pages/AccountPage.tsx
export const AccountPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <h1>アカウント情報</h1>
      <Navigation />
    </Container>
  );
};
```

#### ヘルプ画面
```typescript
// packages/bubblepop/src/pages/HelpPage.tsx
export const HelpPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <h1>ヘルプ</h1>
      <Navigation />
    </Container>
  );
};
```

#### ヘルプ詳細画面
```typescript
// packages/bubblepop/src/pages/HelpDetailPage.tsx
import { useParams } from 'react-router-dom';

export const HelpDetailPage: React.FC = () => {
  const { category, topic } = useParams<{ category: string; topic: string }>();
  
  return (
    <Container maxWidth="lg">
      <h1>ヘルプ詳細 - {category} / {topic}</h1>
      <Navigation />
    </Container>
  );
};
```

#### ショップ画面
```typescript
// packages/bubblepop/src/pages/ShopPage.tsx
export const ShopPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <h1>ショップ</h1>
      <Navigation />
    </Container>
  );
};
```

#### アイテム詳細画面
```typescript
// packages/bubblepop/src/pages/ItemDetailPage.tsx
import { useParams } from 'react-router-dom';

export const ItemDetailPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  
  return (
    <Container maxWidth="md" center>
      <Card elevation={2}>
        <h1>アイテム詳細 - {itemId}</h1>
        <Navigation />
      </Card>
    </Container>
  );
};
```

#### 設定画面
```typescript
// packages/bubblepop/src/pages/SettingsPage.tsx
export const SettingsPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <h1>設定</h1>
      <Navigation />
    </Container>
  );
};
```

#### 404画面
```typescript
// packages/bubblepop/src/pages/NotFoundPage.tsx
export const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="md" center>
      <Card elevation={2}>
        <h1>404 - ページが見つかりません</h1>
        <Button 
          variant="primary" 
          onClick={() => navigate('/')}
        >
          ホームに戻る
        </Button>
      </Card>
    </Container>
  );
};
```

### ナビゲーションコンポーネント

```typescript
// packages/bubblepop/src/components/Navigation.tsx
import { Link, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/main', label: 'メイン' },
    { path: '/account', label: 'アカウント' },
    { path: '/help', label: 'ヘルプ' },
    { path: '/shop', label: 'ショップ' },
    { path: '/settings', label: '設定' },
  ];
  
  return (
    <nav>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={location.pathname === item.path ? 'active' : ''}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
```

## Data Models

### ルートパラメータ型定義

```typescript
// packages/bubblepop/src/types/RouterTypes.ts
export interface GamePageParams {
  stageId: string;
}

export interface HelpDetailPageParams {
  category: string;
  topic: string;
}

export interface ItemDetailPageParams {
  itemId: string;
}

export interface NavigationItem {
  path: string;
  label: string;
  icon?: string;
}
```

## Error Handling

### ルーティングエラーハンドリング

1. **404エラー**: 存在しないルートにアクセスした場合の処理
2. **パラメータエラー**: 無効なパラメータが渡された場合の処理
3. **ナビゲーションエラー**: ルート遷移時のエラー処理

### エラー境界

```typescript
// packages/bubblepop/src/components/ErrorBoundary.tsx
export class RouterErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Router Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <NotFoundPage />;
    }

    return this.props.children;
  }
}
```

## Testing Strategy

### 単体テスト

1. **ルーター設定テスト**: 各ルートが正しく設定されているか
2. **ページコンポーネントテスト**: 各ページが正しくレンダリングされるか
3. **ナビゲーションテスト**: ナビゲーションが正しく動作するか
4. **パラメータテスト**: ルートパラメータが正しく取得されるか

### テストファイル構成

```
packages/bubblepop/src/
├── router/
│   └── __tests__/
│       └── Router.test.tsx
├── pages/
│   └── __tests__/
│       ├── TitlePage.test.tsx
│       ├── MainPage.test.tsx
│       ├── GamePage.test.tsx
│       └── ...
└── components/
    └── __tests__/
        └── Navigation.test.tsx
```

### テストケース例

```typescript
// Router.test.tsx
describe('AppRouter', () => {
  test('should render title page for root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText('BubblePop')).toBeInTheDocument();
  });

  test('should render 404 page for unknown path', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText('404 - ページが見つかりません')).toBeInTheDocument();
  });
});
```

## Implementation Notes

### React Router v6の特徴

- **Routes**: ルート定義の新しい方法
- **Navigate**: リダイレクト用コンポーネント
- **useParams**: ルートパラメータの取得
- **useLocation**: 現在のロケーション情報の取得
- **useNavigate**: プログラム的なナビゲーション

### パフォーマンス考慮事項

- **Lazy Loading**: ページコンポーネントの遅延読み込み
- **Code Splitting**: ルート単位でのコード分割
- **Preloading**: 次のページの事前読み込み

### アクセシビリティ

- **キーボードナビゲーション**: タブキーでの移動
- **ARIA属性**: ナビゲーションの適切なラベル付け
- **フォーカス管理**: ページ遷移時のフォーカス制御

この設計により、保守性が高く、拡張しやすいルーティングシステムを構築できます。