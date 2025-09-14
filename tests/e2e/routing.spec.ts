import { test, expect } from '@playwright/test';

test.describe('ルーティング動作確認', () => {
  test('ルートページが表示される', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.locator('text=タイトル画面')).toBeVisible();
  });

  test('404ページが表示される', async ({ page }) => {
    await page.goto('http://localhost:3000/nonexistent');
    await expect(page.locator('text=404 - ページが見つかりません')).toBeVisible();
  });

  test('各ルートへのアクセスが可能', async ({ page }) => {
    // メイン画面
    await page.goto('http://localhost:3000/main');
    await expect(page.locator('text=メイン画面')).toBeVisible();

    // ゲームプレイ画面
    await page.goto('http://localhost:3000/game/1');
    await expect(page.locator('text=ゲームプレイ画面')).toBeVisible();

    // アカウント画面
    await page.goto('http://localhost:3000/account');
    await expect(page.locator('text=アカウント情報画面')).toBeVisible();

    // ヘルプ画面
    await page.goto('http://localhost:3000/help');
    await expect(page.locator('text=ヘルプ画面')).toBeVisible();

    // ショップ画面
    await page.goto('http://localhost:3000/shop');
    await expect(page.locator('text=ショップ画面')).toBeVisible();

    // 設定画面
    await page.goto('http://localhost:3000/settings');
    await expect(page.locator('text=設定画面')).toBeVisible();
  });

  test('ブラウザの戻るボタンで前の画面に戻る', async ({ page }) => {
    // タイトル画面から開始
    await page.goto('http://localhost:3000/');
    await expect(page.locator('text=タイトル画面')).toBeVisible();

    // メイン画面へ遷移
    await page.goto('http://localhost:3000/main');
    await expect(page.locator('text=メイン画面')).toBeVisible();

    // ゲームプレイ画面へ遷移
    await page.goto('http://localhost:3000/game/1');
    await expect(page.locator('text=ゲームプレイ画面')).toBeVisible();

    // ブラウザの戻るボタンでメイン画面に戻る
    await page.goBack();
    await expect(page.locator('text=メイン画面')).toBeVisible();

    // もう一度戻るボタンでタイトル画面に戻る
    await page.goBack();
    await expect(page.locator('text=タイトル画面')).toBeVisible();

    // 進むボタンでメイン画面に進む
    await page.goForward();
    await expect(page.locator('text=メイン画面')).toBeVisible();
  });
});