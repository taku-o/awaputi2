import { test, expect } from '@playwright/test';

// 並列実行を避ける（Storybookの状態が共有されるため）
test.describe.configure({ mode: 'serial' });

test.describe('Storybook Build Test', () => {
  // タイムアウトを延長
  test.setTimeout(30000);

  test('Storybookのビルドファイルが正しく表示される', async ({ page }) => {
    // Storybookのビルドされた静的ファイルにアクセス
    await page.goto('http://localhost:6006', { waitUntil: 'networkidle' });
    
    // Storybookが正しくロードされることを確認
    // ビルドされたStorybookでは構造が異なる可能性があるため、より汎用的なセレクタを使用
    
    // iframeが存在することを確認（Storybookの中核要素）
    const iframe = page.locator('#storybook-preview-iframe');
    await expect(iframe).toBeVisible({ timeout: 10000 });
    
    // 少なくとも1つのストーリーリンクが存在することを確認
    const storyLinks = page.locator('a[id*="components"], button:has-text("Components")');
    await expect(storyLinks.first()).toBeVisible({ timeout: 10000 });
  });

  test('各コンポーネントストーリーが正しく表示される', async ({ page }) => {
    await page.goto('http://localhost:6006', { waitUntil: 'networkidle' });
    
    // Buttonストーリーのテスト
    // ストーリーへ直接URLでアクセス
    await page.goto('http://localhost:6006/?path=/story/components-button--primary', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // ストーリーのレンダリングを待つ
    
    const buttonIframe = page.frameLocator('#storybook-preview-iframe');
    // MUIボタンを特定
    await expect(buttonIframe.locator('button.MuiButton-root, button.MuiButtonBase-root').first()).toBeVisible({ timeout: 10000 });
    
    // Cardストーリーのテスト
    await page.goto('http://localhost:6006/?path=/story/components-card--default', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const cardIframe = page.frameLocator('#storybook-preview-iframe');
    await expect(cardIframe.locator('.MuiCard-root').first()).toBeVisible({ timeout: 10000 });
    
    // Containerストーリーのテスト
    await page.goto('http://localhost:6006/?path=/story/components-container--max-width-xs', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const containerIframe = page.frameLocator('#storybook-preview-iframe');
    await expect(containerIframe.locator('.MuiContainer-root').first()).toBeVisible({ timeout: 10000 });
  });

  test('コンソールエラーがないことを確認', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    // コンソールエラーの監視
    page.on('console', msg => {
      if (msg.type() === 'error') {
        // 既知の無視可能なエラーをフィルタリング
        const text = msg.text();
        if (!text.includes('ResizeObserver') && 
            !text.includes('Non-Error promise rejection captured') &&
            !text.includes('favicon.ico')) {
          consoleErrors.push(text);
        }
      }
    });

    // ページエラーの監視
    page.on('pageerror', error => {
      consoleErrors.push(error.message);
    });

    // 各ストーリーのURLを直接アクセスして確認
    const storyUrls = [
      'http://localhost:6006/?path=/story/components-button--primary',
      'http://localhost:6006/?path=/story/components-card--default',
      'http://localhost:6006/?path=/story/components-container--max-width-xs'
    ];
    
    for (const url of storyUrls) {
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
    }
    
    // コンソールエラーがないことを確認
    if (consoleErrors.length > 0) {
      console.error('Console errors found:', consoleErrors);
    }
    expect(consoleErrors).toHaveLength(0);
  });
});