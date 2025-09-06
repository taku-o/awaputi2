import { test, expect } from '@playwright/test';

test('コンソールエラーが発生しないことを確認', async ({ page }) => {
  const consoleErrors: string[] = [];
  
  // コンソールエラーをキャッチ
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // ページにアクセス
  await page.goto('http://localhost:3000');
  
  // UI Library Versionが表示されるまで待機
  await page.waitForSelector('[data-testid="ui-library-version"]');
  
  // コンソールエラーがないことを確認
  expect(consoleErrors).toHaveLength(0);
  
  // 特定のエラーメッセージがないことを確認
  const hasVersionError = consoleErrors.some(error => 
    error.includes('__UI_LIBRARY_VERSION__') || 
    error.includes('is not defined')
  );
  expect(hasVersionError).toBe(false);
});