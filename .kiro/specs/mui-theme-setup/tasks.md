# Implementation Plan

- [x] 1. MUI依存関係の追加とpackage.json更新
  - ui-libraryパッケージのpackage.jsonにMUI関連依存関係を追加
  - @mui/material、@mui/system、@emotion/react、@emotion/styledを追加
  - peerDependenciesを適切に更新
  - _Requirements: 5.1, 5.2, 5.3_

- [x] 2. テーマディレクトリ構造の作成
  - src/theme/ディレクトリを作成
  - src/providers/ディレクトリを作成
  - 各テーマファイルの基本構造を作成
  - _Requirements: 4.1_

- [x] 3. カラーパレット定義の実装
  - src/theme/palette.tsファイルを作成
  - プライマリカラー(#4CAF50)とセカンダリカラー(#FFD700)を設定
  - 背景色(#0F0F1E, #2A2A3E)とテキストカラー(#FFFFFF, #B0B0C0)を設定
  - エラー、警告、情報、成功カラーを設定
  - _Requirements: 1.2, 1.3, 1.4, 1.5_

- [x] 4. タイポグラフィ設定の実装
  - src/theme/typography.tsファイルを作成
  - メインフォント(Helvetica, Arial, sans-serif)を設定
  - 見出しサイズ(h1:72px, h2:48px, h3:36px, h4:24px)を設定
  - 本文サイズ(body1:16px, body2:14px)とボタンサイズ(28px)を設定
  - 適切なフォントウェイトと行間を設定
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 5. スペーシングとシェイプ設定の実装
  - src/theme/spacing.tsファイルを作成
  - 8pxベースのスペーシングシステムを設定
  - borderRadius(8px)を設定
  - レスポンシブブレークポイントを設定
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 6. カスタムコンポーネントスタイルの実装
  - src/theme/components.tsファイルを作成
  - MuiButtonのカスタムスタイルを実装
  - MuiCardのカスタムスタイルを実装
  - MuiTypographyのカスタムスタイルを実装
  - _Requirements: 1.1_

- [x] 7. メインテーマオブジェクトの作成
  - src/theme/index.tsファイルを作成
  - createTheme関数を使用してテーマオブジェクトを作成
  - 各設定ファイル(palette, typography, spacing, components)をインポートして統合
  - テーマオブジェクトをエクスポート
  - _Requirements: 4.1, 4.4_

- [x] 8. テーマプロバイダーコンポーネントの実装
  - src/providers/ThemeProvider.tsxファイルを作成
  - MuiThemeProviderとCssBaselineを使用
  - 適切なPropsインターフェースを定義
  - _Requirements: 4.3_

- [x] 9. TypeScript型定義の実装
  - src/theme/types.tsファイルを作成
  - BubblePopThemeConfig型を定義
  - MUIテーマの型拡張を実装
  - _Requirements: 4.4_

- [x] 10. ライブラリエクスポートの更新
  - src/index.tsファイルを更新
  - テーマオブジェクトとプロバイダーをエクスポート
  - 型定義をエクスポート
  - 既存のエクスポートを維持
  - _Requirements: 4.2_

- [x] 11. テストファイルの作成
  - tests/ディレクトリを作成
  - tests/theme.test.tsでテーマオブジェクトのユニットテストを作成
  - tests/ThemeProvider.test.tsxでプロバイダーのテストを作成
  - tests/integration.test.tsxで統合テストを作成
  - _Requirements: 1.1, 2.1, 3.1, 4.1_

- [x] 12. テストセットアップとパッケージビルド
  - package.jsonにテスト関連の依存関係を追加（jest, @testing-library/react等）
  - package.jsonに"test"スクリプトを追加
  - npm installで依存関係をインストール
  - npm run buildでパッケージをビルド
  - npm run testでテストを実行
  - TypeScriptコンパイルエラーがないことを確認
  - _Requirements: 4.4, 5.3_