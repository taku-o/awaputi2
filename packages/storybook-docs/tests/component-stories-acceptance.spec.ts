import { test, expect } from '@playwright/test';

test.describe('Component Stories Acceptance Criteria', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
    await expect(page.locator('#storybook-explorer-tree')).toBeVisible({ timeout: 30000 });
  });

  test('Button component should display all required story variations', async ({ page }) => {
    // Buttonグループを展開
    await page.click('[data-item-id="components-button"]');
    await page.waitForTimeout(500);
    
    // Primary、Secondary、Iconストーリーが存在することを確認
    await expect(page.locator('[data-item-id="components-button--primary"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-button--secondary"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-button--icon"]')).toBeVisible();
    
    // 各ストーリーをクリックして表示確認
    await page.click('[data-item-id="components-button--primary"]');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('button:has-text("Primary Button")').first()).toBeVisible();
    
    await page.click('[data-item-id="components-button--secondary"]');
    await expect(iframe.locator('button:has-text("Secondary Button")').first()).toBeVisible();
    
    await page.click('[data-item-id="components-button--icon"]');
    await expect(iframe.locator('button:has-text("🎮")').first()).toBeVisible();
  });

  test('Card component should display all required story variations', async ({ page }) => {
    // Cardグループを展開
    await page.click('[data-item-id="components-card"]');
    await page.waitForTimeout(500);
    
    // Default、Hoverable、Outlinedストーリーが存在することを確認
    await expect(page.locator('[data-item-id="components-card--default"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-card--hoverable"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-card--outlined"]')).toBeVisible();
    
    // 各ストーリーをクリックして表示確認
    await page.click('[data-item-id="components-card--default"]');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('h3:has-text("Card Title")').first()).toBeVisible();
    
    await page.click('[data-item-id="components-card--hoverable"]');
    await expect(iframe.locator('h3:has-text("Hoverable Card")').first()).toBeVisible();
    
    await page.click('[data-item-id="components-card--outlined"]');
    await expect(iframe.locator('h3:has-text("Outlined Card")').first()).toBeVisible();
  });

  test('Container component should display all required story variations', async ({ page }) => {
    // Containerグループを展開
    await page.click('[data-item-id="components-container"]');
    await page.waitForTimeout(500);
    
    // 各maxWidthストーリーが存在することを確認
    await expect(page.locator('[data-item-id="components-container--default"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-container--max-width-xs"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-container--centered"]')).toBeVisible();
    
    // 各paddingストーリーが存在することを確認
    await expect(page.locator('[data-item-id="components-container--no-padding"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-container--medium-padding"]')).toBeVisible();
    
    // デフォルトストーリーをクリックして表示確認
    await page.click('[data-item-id="components-container--default"]');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('h6:has-text("Container Content")').first()).toBeVisible();
  });
});