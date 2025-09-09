# 設計書

## 概要

Phase 5の最小限のコンポーネントストーリー作成において、既存のStorybookストーリーを確認し、必要に応じて改善を行います。現在のストーリーは基本的な機能を満たしていますが、統一性とドキュメント品質の向上を図ります。

## アーキテクチャ

### ストーリー構造
```
packages/storybook-docs/src/stories/
├── Button.stories.tsx      # Buttonコンポーネントストーリー
├── Card.stories.tsx        # Cardコンポーネントストーリー
└── Container.stories.tsx   # Containerコンポーネントストーリー
```

### 共通設定
- StorybookのautoDocsタグを使用したドキュメント自動生成
- 統一されたargTypesの定義
- 適切なparametersの設定（layout、viewport等）

## コンポーネントと設計

### Button.stories.tsx
現在の実装は要件を満たしており、既存のストーリーを維持します：

**改善点:**
- ドキュメント記述の統一
- argTypesの説明文の充実
- ストーリーの説明文追加

**既存ストーリー構成（維持）:**
- Primary: プライマリボタンの基本形
- Secondary: セカンダリボタンの基本形
- Icon: アイコンボタンの基本形
- Disabled: 無効状態の表示
- FullWidth: 全幅表示の確認

### Card.stories.tsx
現在の実装は充実しており、既存のストーリーを維持します：

**改善点:**
- 説明文の統一
- ドキュメント記述の改善

**既存ストーリー構成（維持）:**
- Default: 基本的なカード
- NoElevation: フラットなカード
- MediumElevation: 中程度の影付きカード
- HighElevation: 高い影付きカード
- Hoverable: ホバー効果付きカード
- HoverableWithClick: クリック可能なホバーカード
- Outlined: アウトライン形式のカード
- OutlinedHoverable: アウトライン形式のホバーカード
- SmallPadding: 小さなパディング
- LargePadding: 大きなパディング
- NoPadding: パディングなし
- ComplexContent: 複雑なコンテンツ

### Container.stories.tsx
現在の実装は適切であり、既存のストーリーを維持します：

**改善点:**
- レスポンシブ対応の説明強化
- ドキュメント記述の改善

**既存ストーリー構成（維持）:**
- Default: 基本的なコンテナ
- MaxWidthXS: 極小幅制限
- MaxWidthSM: 小幅制限
- MaxWidthMD: 中幅制限
- MaxWidthLG: 大幅制限
- MaxWidthXL: 特大幅制限
- FullWidth: 全幅コンテナ
- Centered: 中央寄せコンテナ
- NoPadding: パディングなし
- SmallPadding: 小さなパディング
- MediumPadding: 中程度のパディング
- LargePadding: 大きなパディング
- ResponsivePadding: レスポンシブパディング
- MultipleCards: 複数カードの表示

## データモデル

### ストーリーメタデータ構造
```typescript
interface StoryMeta {
  title: string;           // ストーリーのタイトル
  component: Component;    // 対象コンポーネント
  parameters: {
    layout: string;        // レイアウト設定
    viewport?: object;     // ビューポート設定
  };
  tags: string[];         // タグ（autodocs等）
  argTypes: ArgTypes;     // 引数の型定義
}
```

### 共通ArgTypes
```typescript
interface CommonArgTypes {
  onClick: { action: string };
  disabled: { control: { type: 'boolean' } };
  children: { control: { type: 'text' } };
}
```

## エラーハンドリング

### ビルドエラー対応
- TypeScript型エラーの解決
- 不正なpropsの検証
- 循環参照の回避

### ランタイムエラー対応
- コンポーネントの存在確認
- プロパティの妥当性検証

## テスト戦略

### 既存テストの確認
- Storybookビルドテストの実行
- コンポーネント単体テストの実行
- 統合テストの実行

### 新規テスト
- ストーリーの表示確認
- プロパティ変更の動作確認
- レスポンシブ対応の確認

この設計により、最小限でありながら包括的なコンポーネントストーリーを提供し、開発者の効率的なコンポーネント理解を支援します。