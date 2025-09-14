import { test, expect } from '@playwright/test';

test.describe('ブラウザナビゲーション動作確認', () => {
  test('ブラウザの戻るボタンが正しく動作する', async ({ page }) => {
    // タイトル画面から開始
    await page.goto('http://localhost:3000/');
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.locator('text=BubblePop')).toBeVisible();

    // メイン画面へ遷移
    await page.goto('http://localhost:3000/main');
    await expect(page).toHaveURL('http://localhost:3000/main');
    await expect(page.locator('text=メイン画面')).toBeVisible();

    // ヘルプ画面へ遷移
    await page.goto('http://localhost:3000/help');
    await expect(page).toHaveURL('http://localhost:3000/help');
    await expect(page.locator('h1:has-text("ヘルプ")')).toBeVisible();

    // ブラウザの戻るボタンでメイン画面に戻る
    await page.goBack();
    await expect(page).toHaveURL('http://localhost:3000/main');
    await expect(page.locator('text=メイン画面')).toBeVisible();

    // さらに戻るボタンでタイトル画面に戻る
    await page.goBack();
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.locator('text=BubblePop')).toBeVisible();

    // 進むボタンでメイン画面に進む
    await page.goForward();
    await expect(page).toHaveURL('http://localhost:3000/main');
    await expect(page.locator('text=メイン画面')).toBeVisible();
  });

  test('URL直接アクセスが正しく動作する', async ({ page }) => {
    // タイトル画面に直接アクセス
    await page.goto('http://localhost:3000/');
    await expect(page.locator('text=BubblePop')).toBeVisible();

    // メイン画面に直接アクセス
    await page.goto('http://localhost:3000/main');
    await expect(page.locator('text=メイン画面')).toBeVisible();

    // ゲーム画面に直接アクセス（パラメータ付き）
    await page.goto('http://localhost:3000/game/1');
    await expect(page.locator('text=ゲームプレイ画面 - ステージ: 1')).toBeVisible();

    // 設定画面に直接アクセス
    await page.goto('http://localhost:3000/settings');
    await expect(page.locator('h1:has-text("設定")')).toBeVisible();

    // ショップ画面に直接アクセス
    await page.goto('http://localhost:3000/shop');
    await expect(page.locator('h1:has-text("ショップ")')).toBeVisible();

    // アカウント画面に直接アクセス
    await page.goto('http://localhost:3000/account');
    await expect(page.locator('h1:has-text("アカウント情報")')).toBeVisible();

    // 存在しないURLに直接アクセス（404ページ）
    await page.goto('http://localhost:3000/unknown-route');
    await expect(page.locator('text=404 - ページが見つかりません')).toBeVisible();
  });

  test('パラメータ付きURLへの直接アクセス', async ({ page }) => {
    // ステージ1のゲーム画面
    await page.goto('http://localhost:3000/game/1');
    await expect(page.locator('text=ステージ: 1')).toBeVisible();

    // ステージ5のゲーム画面
    await page.goto('http://localhost:3000/game/5');
    await expect(page.locator('text=ステージ: 5')).toBeVisible();

    // ヘルプ詳細画面
    await page.goto('http://localhost:3000/help/gameplay/basic');
    await expect(page.locator('text=gameplay / basic')).toBeVisible();

    // アイテム詳細画面
    await page.goto('http://localhost:3000/shop/item-001');
    await expect(page.locator('text=アイテム詳細 - item-001')).toBeVisible();
  });
});