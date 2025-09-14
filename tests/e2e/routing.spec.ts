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

  test.describe('Requirement 4: ルートパラメータ動作確認', () => {
    test('異なるstageIdパラメータが正しく表示される（Requirement 4.1）', async ({ page }) => {
      // ステージ1
      await page.goto('http://localhost:3000/game/1');
      await expect(page.locator('h1:has-text("ゲームプレイ画面 - ステージ: 1")')).toBeVisible();

      // ステージ5
      await page.goto('http://localhost:3000/game/5');
      await expect(page.locator('h1:has-text("ゲームプレイ画面 - ステージ: 5")')).toBeVisible();

      // ステージ10
      await page.goto('http://localhost:3000/game/10');
      await expect(page.locator('h1:has-text("ゲームプレイ画面 - ステージ: 10")')).toBeVisible();
    });

    test('異なるcategoryとtopicパラメータが正しく表示される（Requirement 4.2）', async ({ page }) => {
      // 基本的なヘルプ
      await page.goto('http://localhost:3000/help/gameplay/basics');
      await expect(page.locator('h1:has-text("ヘルプ詳細 - gameplay / basics")')).toBeVisible();

      // 上級者向けヘルプ
      await page.goto('http://localhost:3000/help/advanced/combos');
      await expect(page.locator('h1:has-text("ヘルプ詳細 - advanced / combos")')).toBeVisible();

      // 設定関連ヘルプ
      await page.goto('http://localhost:3000/help/settings/audio');
      await expect(page.locator('h1:has-text("ヘルプ詳細 - settings / audio")')).toBeVisible();
    });

    test('異なるitemIdパラメータが正しく表示される（Requirement 4.3）', async ({ page }) => {
      // アイテム001
      await page.goto('http://localhost:3000/shop/item001');
      await expect(page.locator('h1:has-text("アイテム詳細 - item001")')).toBeVisible();

      // アイテム999
      await page.goto('http://localhost:3000/shop/item999');
      await expect(page.locator('h1:has-text("アイテム詳細 - item999")')).toBeVisible();

      // 特別なアイテムID
      await page.goto('http://localhost:3000/shop/special-boost');
      await expect(page.locator('h1:has-text("アイテム詳細 - special-boost")')).toBeVisible();
    });

    test('URLエンコードされたパラメータが正しく処理される', async ({ page }) => {
      // スペースを含むパラメータ（%20でエンコード）
      await page.goto('http://localhost:3000/help/game%20guide/getting%20started');
      await expect(page.locator('h1:has-text("ヘルプ詳細 - game guide / getting started")')).toBeVisible();
    });

    test('パラメータ付きURLでのブラウザナビゲーション', async ({ page }) => {
      // 異なるステージ間の遷移
      await page.goto('http://localhost:3000/game/1');
      await expect(page.locator('h1:has-text("ステージ: 1")')).toBeVisible();

      await page.goto('http://localhost:3000/game/2');
      await expect(page.locator('h1:has-text("ステージ: 2")')).toBeVisible();

      // 戻るボタンでステージ1に戻る
      await page.goBack();
      await expect(page.locator('h1:has-text("ステージ: 1")')).toBeVisible();

      // 進むボタンでステージ2に進む
      await page.goForward();
      await expect(page.locator('h1:has-text("ステージ: 2")')).toBeVisible();
    });
  });
});