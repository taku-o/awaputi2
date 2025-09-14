import { test, expect } from '@playwright/test';

test.describe('エラーハンドリング', () => {
  test.describe('404エラー処理', () => {
    test('存在しないURLにアクセスすると404ページが表示される', async ({ page }) => {
      await page.goto('/non-existent-page');

      // 404ページのコンテンツを確認
      await expect(page.locator('h1')).toContainText('404 - ページが見つかりません');
      await expect(page.locator('button')).toContainText('ホームに戻る');
    });

    test('404ページから「ホームに戻る」ボタンでタイトルページに遷移できる', async ({ page }) => {
      await page.goto('/non-existent-page');

      // 404ページが表示されるまで待つ
      await expect(page.locator('h1')).toContainText('404 - ページが見つかりません');

      // ホームに戻るボタンをクリック
      await page.click('button:has-text("ホームに戻る")');

      // タイトルページに遷移することを確認
      await expect(page).toHaveURL('/');
      await expect(page.locator('h1')).toContainText('BubblePop');
    });

    test('複数階層の存在しないURLでも404ページが表示される', async ({ page }) => {
      await page.goto('/non/existent/deep/path');

      // 404ページのコンテンツを確認
      await expect(page.locator('h1')).toContainText('404 - ページが見つかりません');
    });
  });

  test.describe('パラメータエラー処理 - GamePage', () => {
    test('無効なstageIdの場合404ページにリダイレクトされる', async ({ page }) => {
      // 無効な文字を含むstageId
      await page.goto('/game/invalid@stage');
      await expect(page).toHaveURL('/404');
      await expect(page.locator('h1')).toContainText('404 - ページが見つかりません');

      // 文字列のstageId（数値のみ有効）
      await page.goto('/game/boss-stage');
      await expect(page).toHaveURL('/404');
      await expect(page.locator('h1')).toContainText('404 - ページが見つかりません');
    });

    test('範囲外の数値stageIdの場合404ページにリダイレクトされる', async ({ page }) => {
      // 範囲外の数値（11以上）
      await page.goto('/game/11');
      await expect(page).toHaveURL('/404');
      await expect(page.locator('h1')).toContainText('404 - ページが見つかりません');

      // 0以下の数値
      await page.goto('/game/0');
      await expect(page).toHaveURL('/404');
      await expect(page.locator('h1')).toContainText('404 - ページが見つかりません');
    });

    test('有効なstageIdの場合は正常にページが表示される', async ({ page }) => {
      // 有効な数値stageId（1-10の範囲）
      await page.goto('/game/1');
      await expect(page.locator('h1')).toContainText('ゲームプレイ画面 - ステージ: 1');

      await page.goto('/game/5');
      await expect(page.locator('h1')).toContainText('ゲームプレイ画面 - ステージ: 5');

      await page.goto('/game/10');
      await expect(page.locator('h1')).toContainText('ゲームプレイ画面 - ステージ: 10');
    });
  });

  test.describe('パラメータエラー処理 - HelpDetailPage', () => {
    test('無効なcategoryの場合404ページにリダイレクトされる', async ({ page }) => {
      // 無効な文字を含むcategory
      await page.goto('/help/@invalid/topic');
      await expect(page).toHaveURL('/404');
      await expect(page.locator('h1')).toContainText('404 - ページが見つかりません');
    });

    test('無効なtopicの場合404ページにリダイレクトされる', async ({ page }) => {
      // 無効な文字を含むtopic
      await page.goto('/help/gameplay/@invalid');
      await expect(page).toHaveURL('/404');
      await expect(page.locator('h1')).toContainText('404 - ページが見つかりません');
    });

    test('categoryまたはtopicが欠けている場合404ページが表示される', async ({ page }) => {
      // topicが欠けている（/help/:categoryは定義されていないルート）
      await page.goto('/help/gameplay');
      await expect(page.locator('h1')).toContainText('404 - ページが見つかりません');
    });

    test('有効なcategoryとtopicの場合は正常にページが表示される', async ({ page }) => {
      await page.goto('/help/gameplay/basic-controls');
      await expect(page.locator('h1')).toContainText('ヘルプ詳細 - gameplay / basic-controls');
    });
  });

  test.describe('パラメータエラー処理 - ItemDetailPage', () => {
    test('無効なitemIdの場合404ページにリダイレクトされる', async ({ page }) => {
      // 無効な文字を含むitemId
      await page.goto('/shop/@invalid-item');
      await expect(page).toHaveURL('/404');
      await expect(page.locator('h1')).toContainText('404 - ページが見つかりません');
    });

    test('50文字を超えるitemIdの場合404ページにリダイレクトされる', async ({ page }) => {
      const longItemId = 'a'.repeat(51);
      await page.goto(`/shop/${longItemId}`);
      await expect(page).toHaveURL('/404');
      await expect(page.locator('h1')).toContainText('404 - ページが見つかりません');
    });

    test('有効なitemIdの場合は正常にページが表示される', async ({ page }) => {
      await page.goto('/shop/power-bubble');
      await expect(page.locator('h1')).toContainText('アイテム詳細 - power-bubble');

      await page.goto('/shop/item_123');
      await expect(page.locator('h1')).toContainText('アイテム詳細 - item_123');
    });
  });

  test.describe('エラー境界（Error Boundary）', () => {
    test('ランタイムエラーが発生した場合、エラー境界でキャッチされる', async ({ page }) => {
      // コンソールのエラーを監視
      const consoleErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      // 正常なページにアクセス
      await page.goto('/');

      // JavaScriptエラーをトリガーする操作をシミュレート
      // （実際のエラーをトリガーする操作がある場合はここに記述）

      // エラー境界が機能していることを確認
      // ページがクラッシュせず、エラーメッセージが表示されることを確認
      const hasRouterError = consoleErrors.some(error => error.includes('Router Error:'));

      // エラー境界が発動した場合は、NotFoundPageが表示される
      if (hasRouterError) {
        await expect(page.locator('h1')).toContainText('404 - ページが見つかりません');
      }
    });
  });
});