# Implementation Plan

- [x] 1. Button コンポーネントの基本実装
  - Button.types.ts で TypeScript 型定義を作成
  - Button.tsx でメインコンポーネントを実装（MUIテーマ統合、variant対応、イベントハンドリング）
  - Button/index.ts でエクスポート設定
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 4.1, 4.2, 4.3_

- [x] 2. Card コンポーネントの基本実装
  - Card.types.ts で TypeScript 型定義を作成
  - Card.tsx でメインコンポーネントを実装（elevation対応、hover効果、クリックハンドリング）
  - Card/index.ts でエクスポート設定
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 4.1, 4.2, 4.3_

- [ ] 3. Container コンポーネントの基本実装
  - Container.types.ts で TypeScript 型定義を作成
  - Container.tsx でメインコンポーネントを実装（レスポンシブ対応、中央揃え、パディング管理）
  - Container/index.ts でエクスポート設定
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3_

- [ ] 4. コンポーネントエクスポートの更新
  - packages/ui-library/src/components/index.ts を更新して新しいコンポーネントをエクスポート
  - packages/ui-library/src/index.ts で全体のエクスポートを確認
  - _Requirements: 4.1, 4.2_

- [ ] 5. Button コンポーネントの単体テスト作成
  - packages/ui-library/tests/Button.test.tsx でレンダリング、インタラクション、状態、プロパティのテストを実装
  - 各variant（primary、secondary、icon）の描画テスト
  - disabled状態とクリックイベントのテスト
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 6. Card コンポーネントの単体テスト作成
  - packages/ui-library/tests/Card.test.tsx でレンダリング、インタラクション、レイアウト、イベントのテストを実装
  - elevation レベルとhover効果のテスト
  - padding適用とonClickハンドラーのテスト
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 7. Container コンポーネントの単体テスト作成
  - packages/ui-library/tests/Container.test.tsx でレイアウト、レスポンシブ、中央揃え、子要素のテストを実装
  - maxWidth適用とレスポンシブパディングのテスト
  - center プロパティと子要素描画のテスト
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 8. 統合テストの実行と既存テストの確認
  - 新しく作成したテストが全て成功することを確認
  - 既存のテスト（integration.test.tsx、theme.test.ts、ThemeProvider.test.tsx）が引き続き成功することを確認
  - テストカバレッジの確認
  - _Requirements: 5.4_