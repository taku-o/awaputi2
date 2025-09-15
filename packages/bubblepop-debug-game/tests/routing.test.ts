import { test, expect } from '@playwright/test';

test.describe('ゲームプレイデバッグアプリのルーティング', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8001');
  });

  test('ルートパス(/)でDebugGameTopPageが表示される', async ({ page }) => {
    // ページタイトルを確認
    await expect(page.locator('h1')).toContainText('ゲームプレイデバッグアプリ');

    // ポート情報の表示を確認
    await expect(page.locator('p').filter({ hasText: 'ポート: 8001' })).toBeVisible();

    // ゲームプレイ画面への遷移ボタンを確認
    const button = page.locator('button').filter({ hasText: 'ゲームプレイ画面を開く' });
    await expect(button).toBeVisible();
  });

  test('/gameパスでGamePageが表示される', async ({ page }) => {
    await page.goto('http://localhost:8001/game');

    // ゲームプレイ画面のタイトルを確認
    await expect(page.locator('h1')).toContainText('ゲームプレイ画面');

    // ゲームコンテナの存在を確認
    await expect(page.locator('#game-container')).toBeVisible();
  });

  test('トップページからゲームプレイ画面へ遷移できる', async ({ page }) => {
    // トップページのボタンをクリック
    const button = page.locator('button').filter({ hasText: 'ゲームプレイ画面を開く' });
    await button.click();

    // URLが/gameに変わったことを確認
    await expect(page).toHaveURL('http://localhost:8001/game');

    // ゲームプレイ画面が表示されることを確認
    await expect(page.locator('h1')).toContainText('ゲームプレイ画面');
  });
});