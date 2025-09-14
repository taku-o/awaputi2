import { test, expect } from '@playwright/test';

test.describe('ルーティング動作確認', () => {
  test('ルートページが表示される', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.locator('h1:has-text("BubblePop")')).toBeVisible();
  });

  test('404ページが表示される', async ({ page }) => {
    await page.goto('http://localhost:3000/nonexistent');
    await expect(page.locator('h1:has-text("404 - ページが見つかりません")')).toBeVisible();
  });

  test('各ルートへのアクセスが可能', async ({ page }) => {
    // メイン画面
    await page.goto('http://localhost:3000/main');
    await expect(page.locator('h1:has-text("メイン画面")')).toBeVisible();

    // ゲームプレイ画面
    await page.goto('http://localhost:3000/game/1');
    await expect(page.locator('h1:has-text("ゲームプレイ画面 - ステージ: 1")')).toBeVisible();

    // プレイ結果画面
    await page.goto('http://localhost:3000/result');
    await expect(page.locator('h1:has-text("プレイ結果")')).toBeVisible();

    // アカウント画面
    await page.goto('http://localhost:3000/account');
    await expect(page.locator('h1:has-text("アカウント情報")')).toBeVisible();

    // ヘルプ画面
    await page.goto('http://localhost:3000/help');
    await expect(page.locator('h1:has-text("ヘルプ")')).toBeVisible();

    // ヘルプ詳細画面
    await page.goto('http://localhost:3000/help/gameplay/basics');
    await expect(page.locator('h1:has-text("ヘルプ詳細 - gameplay / basics")')).toBeVisible();

    // ショップ画面
    await page.goto('http://localhost:3000/shop');
    await expect(page.locator('h1:has-text("ショップ")')).toBeVisible();

    // アイテム詳細画面
    await page.goto('http://localhost:3000/shop/item001');
    await expect(page.locator('h1:has-text("アイテム詳細 - item001")')).toBeVisible();

    // 設定画面
    await page.goto('http://localhost:3000/settings');
    await expect(page.locator('h1:has-text("設定")')).toBeVisible();
  });

  test('ブラウザの戻るボタンで前の画面に戻る', async ({ page }) => {
    // タイトル画面から開始
    await page.goto('http://localhost:3000/');
    await expect(page.locator('h1:has-text("BubblePop")')).toBeVisible();

    // メイン画面へ遷移
    await page.goto('http://localhost:3000/main');
    await expect(page.locator('h1:has-text("メイン画面")')).toBeVisible();

    // ゲームプレイ画面へ遷移
    await page.goto('http://localhost:3000/game/1');
    await expect(page.locator('h1:has-text("ゲームプレイ画面 - ステージ: 1")')).toBeVisible();

    // ブラウザの戻るボタンでメイン画面に戻る
    await page.goBack();
    await expect(page.locator('h1:has-text("メイン画面")')).toBeVisible();

    // もう一度戻るボタンでタイトル画面に戻る
    await page.goBack();
    await expect(page.locator('h1:has-text("BubblePop")')).toBeVisible();

    // 進むボタンでメイン画面に進む
    await page.goForward();
    await expect(page.locator('h1:has-text("メイン画面")')).toBeVisible();
  });
});