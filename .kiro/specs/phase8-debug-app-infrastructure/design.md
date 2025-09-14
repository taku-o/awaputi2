# Phase 8: デバッグアプリ基盤構築 - 設計書

## 概要
Phase 8では、開発・デバッグ・動作確認用のデバッグアプリ基盤を構築します。各画面への直接アクセスを可能にするデバッグ用トップページと、各デバッグアプリのルーティング設定を実装します。

## システム構成

### 1. アーキテクチャ概要
```
本番アプリ (bubblepop)
├─ ポート: 3000
├─ 用途: 本番ゲームアプリ
└─ デバッグアプリ群 (独立したプロジェクト)
    ├─ bubblepop-debug-game (ポート: 8001)
    ├─ bubblepop-debug-settings (ポート: 8002)
    ├─ bubblepop-debug-help (ポート: 8003)
    ├─ bubblepop-debug-account (ポート: 8004)
    ├─ bubblepop-debug-shop (ポート: 8005)
    └─ bubblepop-debug-notification (ポート: 8006)
```

### 2. プロジェクト構造
```
packages/
├─ bubblepop/                    # 本番アプリ
│   ├─ src/
│   │   ├─ pages/
│   │   │   ├─ TitlePage.tsx
│   │   │   ├─ MainPage.tsx
│   │   │   ├─ GamePage.tsx
│   │   │   ├─ SettingsPage.tsx
│   │   │   ├─ HelpPage.tsx
│   │   │   ├─ AccountPage.tsx
│   │   │   └─ ShopPage.tsx
│   │   └─ router/
│   │       └─ Router.tsx
│   └─ package.json
├─ bubblepop-debug-game/         # デバッグ用ゲームプレイアプリ
│   ├─ src/
│   │   ├─ pages/
│   │   │   ├─ DebugGameTopPage.tsx
│   │   │   └─ GamePage.tsx
│   │   └─ router/
│   │       └─ Router.tsx
│   └─ package.json
├─ bubblepop-debug-settings/     # デバッグ用設定アプリ
│   ├─ src/
│   │   ├─ pages/
│   │   │   ├─ DebugSettingsTopPage.tsx
│   │   │   └─ SettingsPage.tsx
│   │   └─ router/
│   │       └─ Router.tsx
│   └─ package.json
├─ bubblepop-debug-help/         # デバッグ用ヘルプアプリ
│   ├─ src/
│   │   ├─ pages/
│   │   │   ├─ DebugHelpTopPage.tsx
│   │   │   └─ HelpPage.tsx
│   │   └─ router/
│   │       └─ Router.tsx
│   └─ package.json
├─ bubblepop-debug-account/      # デバッグ用アカウントアプリ
│   ├─ src/
│   │   ├─ pages/
│   │   │   ├─ DebugAccountTopPage.tsx
│   │   │   └─ AccountPage.tsx
│   │   └─ router/
│   │       └─ Router.tsx
│   └─ package.json
├─ bubblepop-debug-shop/         # デバッグ用ショップアプリ
│   ├─ src/
│   │   ├─ pages/
│   │   │   ├─ DebugShopTopPage.tsx
│   │   │   └─ ShopPage.tsx
│   │   └─ router/
│   │       └─ Router.tsx
│   └─ package.json
└─ bubblepop-debug-notification/ # デバッグ用通知アプリ
    ├─ src/
    │   ├─ pages/
    │   │   ├─ DebugNotificationTopPage.tsx
    │   │   └─ NotificationPage.tsx
    │   └─ router/
    │       └─ Router.tsx
    └─ package.json
```

## 詳細設計

### 1. デバッグ用トップページ設計

#### 1.1 メインのデバッグ用トップページ
本番アプリ内にデバッグ用トップページを追加し、各デバッグアプリへのリンクを提供します。

**ファイル**: `packages/bubblepop/src/pages/DebugTopPage.tsx`

```typescript
interface DebugAppInfo {
  name: string;
  description: string;
  url: string;
  port: number;
  targetScreen: string;
}

const debugApps: DebugAppInfo[] = [
  {
    name: "ゲームプレイデバッグ",
    description: "ゲームプレイ画面の動作確認",
    url: "http://localhost:8001/",
    port: 8001,
    targetScreen: "game"
  },
  {
    name: "設定画面デバッグ",
    description: "設定機能の動作確認",
    url: "http://localhost:8002/",
    port: 8002,
    targetScreen: "settings"
  },
  {
    name: "ヘルプ画面デバッグ",
    description: "ヘルプシステムの動作確認",
    url: "http://localhost:8003/",
    port: 8003,
    targetScreen: "help"
  },
  {
    name: "アカウント画面デバッグ",
    description: "アカウント機能の動作確認",
    url: "http://localhost:8004/",
    port: 8004,
    targetScreen: "account"
  },
  {
    name: "ショップ画面デバッグ",
    description: "ショップ機能の動作確認",
    url: "http://localhost:8005/",
    port: 8005,
    targetScreen: "shop"
  },
  {
    name: "通知機能デバッグ",
    description: "通知システムの動作確認",
    url: "http://localhost:8006/",
    port: 8006,
    targetScreen: "notification"
  }
];
```

#### 1.2 各デバッグアプリのトップページ
各デバッグアプリは独立したトップページを持ち、対象画面への遷移を提供します。

**共通構造**:
```typescript
interface DebugTopPageProps {
  appName: string;
  targetScreen: string;
  targetScreenName: string;
  port: number;
}

// 例: DebugGameTopPage.tsx
const DebugGameTopPage: React.FC<DebugTopPageProps> = ({
  appName = "ゲームプレイデバッグ",
  targetScreen = "game",
  targetScreenName = "ゲームプレイ画面",
  port = 8001
}) => {
  // 実装
};
```

### 2. ルーティング設計

#### 2.1 本番アプリのルーティング拡張
本番アプリにデバッグ用トップページのルートを追加します。

**ファイル**: `packages/bubblepop/src/router/Router.tsx`

```typescript
const routes = [
  { path: '/', element: <TitlePage /> },
  { path: '/main', element: <MainPage /> },
  { path: '/game', element: <GamePage /> },
  { path: '/settings', element: <SettingsPage /> },
  { path: '/help', element: <HelpPage /> },
  { path: '/account', element: <AccountPage /> },
  { path: '/shop', element: <ShopPage /> },
  // デバッグ用ルート追加
  { path: '/debug', element: <DebugTopPage /> },
];
```

#### 2.2 各デバッグアプリのルーティング
各デバッグアプリは独立したルーティング設定を持ちます。

**共通構造**:
```typescript
// 例: bubblepop-debug-game/src/router/Router.tsx
const debugGameRoutes = [
  { path: '/', element: <DebugGameTopPage /> },
  { path: '/game', element: <GamePage /> },
];

// 例: bubblepop-debug-settings/src/router/Router.tsx
const debugSettingsRoutes = [
  { path: '/', element: <DebugSettingsTopPage /> },
  { path: '/settings', element: <SettingsPage /> },
];
```

### 3. パッケージ設定設計

#### 3.1 各デバッグアプリのpackage.json
各デバッグアプリは独立したpackage.jsonを持ちます。

**共通構造**:
```json
{
  "name": "@bubblepop/debug-{app-name}",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port {port}",
    "build": "tsc && vite build",
    "preview": "vite preview --port {port}"
  },
  "dependencies": {
    "@bubblepop/ui-library": "workspace:*",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "vite": "^4.0.0"
  }
}
```

#### 3.2 環境変数設定
各デバッグアプリは独立した環境変数ファイルを持ちます。

**共通構造**:
```bash
# .env.development
VITE_APP_TYPE=debug-{app-name}
VITE_DEBUG_PORT={port}
VITE_TARGET_SCREEN={target-screen}
VITE_APP_TITLE="{App Name} Debug"
```

### 4. Vite設定設計

#### 4.1 各デバッグアプリのvite.config.ts
各デバッグアプリは独立したVite設定を持ちます。

**共通構造**:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_DEBUG_PORT || '8001'),
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
```

### 5. コンポーネント設計

#### 5.1 デバッグ用トップページコンポーネント
**ファイル**: `packages/bubblepop/src/pages/DebugTopPage.tsx`

```typescript
import React from 'react';
import { Container, Card, Button } from '@bubblepop/ui-library';

interface DebugAppInfo {
  name: string;
  description: string;
  url: string;
  port: number;
  targetScreen: string;
}

const DebugTopPage: React.FC = () => {
  const debugApps: DebugAppInfo[] = [
    // デバッグアプリ情報
  ];

  const handleAppClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Container>
      <h1>BubblePop デバッグアプリ</h1>
      <p>各画面への直接アクセスが可能なデバッグアプリです。</p>
      
      <div className="debug-apps-grid">
        {debugApps.map((app) => (
          <Card key={app.targetScreen}>
            <h3>{app.name}</h3>
            <p>{app.description}</p>
            <p>ポート: {app.port}</p>
            <Button onClick={() => handleAppClick(app.url)}>
              {app.name}を開く
            </Button>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default DebugTopPage;
```

#### 5.2 各デバッグアプリのトップページコンポーネント
**共通構造**:
```typescript
import React from 'react';
import { Container, Card, Button } from '@bubblepop/ui-library';
import { useNavigate } from 'react-router-dom';

interface DebugTopPageProps {
  appName: string;
  targetScreen: string;
  targetScreenName: string;
  port: number;
}

const DebugTopPage: React.FC<DebugTopPageProps> = ({
  appName,
  targetScreen,
  targetScreenName,
  port
}) => {
  const navigate = useNavigate();

  const handleNavigateToTarget = () => {
    navigate(`/${targetScreen}`);
  };

  return (
    <Container>
      <h1>{appName}</h1>
      <p>ポート: {port}</p>
      <p>{targetScreenName}への直接アクセスが可能です。</p>
      
      <Card>
        <h3>{targetScreenName}</h3>
        <p>{targetScreenName}の動作確認を行います。</p>
        <Button onClick={handleNavigateToTarget}>
          {targetScreenName}を開く
        </Button>
      </Card>
    </Container>
  );
};

export default DebugTopPage;
```

## 実装手順

### 1. 本番アプリの拡張
1. `DebugTopPage.tsx`コンポーネントの作成
2. ルーターにデバッグ用ルートの追加
3. デバッグ用トップページへのアクセス方法の確認

### 2. 各デバッグアプリの作成
1. 各デバッグアプリのパッケージディレクトリの作成
2. 各デバッグアプリのpackage.jsonの作成
3. 各デバッグアプリのVite設定の作成
4. 各デバッグアプリのルーティング設定の作成
5. 各デバッグアプリのトップページコンポーネントの作成

### 3. 統合テスト
1. 各デバッグアプリの起動確認
2. 本番アプリからのデバッグアプリへのリンク確認
3. 各デバッグアプリの対象画面への遷移確認

## セキュリティ考慮事項

### 1. 開発環境での制限
- デバッグアプリは開発環境でのみ動作
- 本番環境では自動的に無効化

### 2. アクセス制御
- デバッグ用URLは公開しない
- 開発者以外のアクセスを制限

## パフォーマンス考慮事項

### 1. 独立起動
- 各デバッグアプリは独立して起動・停止可能
- 本番アプリに影響を与えない設計

### 2. リソース使用量
- 各デバッグアプリは必要最小限のリソースを使用
- 不要な依存関係の排除

## 保守性考慮事項

### 1. コードの重複回避
- 共通コンポーネントの活用
- 設定ファイルのテンプレート化

### 2. 独立管理
- 各デバッグアプリは独立したプロジェクトとして管理
- 個別のバージョン管理

## 参考ドキュメント
- docs/planning/debug_features.md
- docs/design/development_steps_plan.md
- docs/planning/page_flow.md
- docs/planning/url_pattern.md
