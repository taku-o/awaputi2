import { test, expect } from '@playwright/test';

test.describe('Storybook Stories Display Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
    await page.waitForLoadState('networkidle');
  });

  test('Button component stories should display correctly', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-button--primary');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('button:has-text("Primary Button")')).toBeVisible();
    
    await page.goto('http://localhost:6006/?path=/story/components-button--secondary');
    await expect(iframe.locator('button:has-text("Secondary Button")')).toBeVisible();
    
    await page.goto('http://localhost:6006/?path=/story/components-button--icon');
    await expect(iframe.locator('button:has-text("🎮")')).toBeVisible();
  });

  test('Card component stories should display correctly', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-card--default');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('text=カードタイトル')).toBeVisible();
    
    await page.goto('http://localhost:6006/?path=/story/components-card--hoverable');
    await expect(iframe.locator('text=ホバー可能なカード')).toBeVisible();
    
    await page.goto('http://localhost:6006/?path=/story/components-card--outlined');
    await expect(iframe.locator('text=アウトラインカード')).toBeVisible();
  });

  test('Container component stories should display correctly', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-container--default');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('text=Container Content')).toBeVisible();
    
    await page.goto('http://localhost:6006/?path=/story/components-container--max-width-xs');
    await expect(iframe.locator('text=Container Content')).toBeVisible();
    
    await page.goto('http://localhost:6006/?path=/story/components-container--medium-padding');
    await expect(iframe.locator('text=Container Content')).toBeVisible();
  });
});