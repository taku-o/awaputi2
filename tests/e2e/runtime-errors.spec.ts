import { test, expect } from '@playwright/test';

test('JavaScript実行時エラーの監視', async ({ page }) => {
  const jsErrors: Error[] = [];
  
  // JavaScript実行時エラーをキャッチ
  page.on('pageerror', (error) => {
    jsErrors.push(error);
  });

  await page.goto('http://localhost:3000');
  
  // ページが完全に読み込まれるまで待機
  await page.waitForLoadState('networkidle');
  
  // UI操作を実行してエラーを誘発させる
  const versionElement = page.locator('[data-testid="ui-library-version"]');
  
  // 要素が存在する場合のみクリック
  if (await versionElement.count() > 0) {
    await versionElement.click();
  }
  
  // JavaScript実行時エラーがないことを確認
  expect(jsErrors).toHaveLength(0);
  
  // 特定のエラーパターンをチェック
  const hasDefineError = jsErrors.some(error => 
    error.message.includes('is not defined') ||
    error.message.includes('__UI_LIBRARY_VERSION__')
  );
  expect(hasDefineError).toBe(false);
});