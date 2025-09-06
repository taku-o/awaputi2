import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { resolve } from 'path';

test('UI Library Versionが正しく表示される', async ({ page }) => {
  // package.jsonから期待されるバージョンを読み取り
  const packageJson = JSON.parse(
    readFileSync(resolve(process.cwd(), 'packages/ui-library/package.json'), 'utf-8')
  );
  const expectedVersion = packageJson.version;

  await page.goto('http://localhost:3000');
  
  // バージョン表示要素を取得
  const versionElement = page.locator('[data-testid="ui-library-version"]');
  await expect(versionElement).toBeVisible();
  
  // 表示されているバージョンが期待値と一致することを確認
  const displayedText = await versionElement.textContent();
  expect(displayedText).toContain(expectedVersion);
  
  // "0.0.0"や"undefined"が表示されていないことを確認
  expect(displayedText).not.toContain('0.0.0');
  expect(displayedText).not.toContain('undefined');
});