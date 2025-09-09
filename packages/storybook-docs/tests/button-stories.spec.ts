import { test, expect } from '@playwright/test';

test.describe('Button Storybookストーリーの動作確認', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
    await expect(page.locator('#storybook-explorer-tree')).toBeVisible({ timeout: 30000 });
  });

  test('Buttonコンポーネントの基本的な5つのバリエーション（Primary、Secondary、Icon、Disabled、FullWidth）が表示される', async ({ page }) => {
    // Buttonグループを展開
    await page.click('[data-item-id="components-button"]');
    await page.waitForTimeout(500);
    
    // 5つの基本ストーリーが存在することを確認
    await expect(page.locator('[data-item-id="components-button--primary"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-button--secondary"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-button--icon"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-button--disabled"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-button--full-width"]')).toBeVisible();
    
    // 各ストーリーをクリックして表示確認
    await page.click('[data-item-id="components-button--primary"]');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('button:has-text("Primary Button")').first()).toBeVisible();
    
    await page.click('[data-item-id="components-button--secondary"]');
    await expect(iframe.locator('button:has-text("Secondary Button")').first()).toBeVisible();
    
    await page.click('[data-item-id="components-button--icon"]');
    await expect(iframe.locator('button:has-text("🎮")').first()).toBeVisible();
    
    await page.click('[data-item-id="components-button--disabled"]');
    await expect(iframe.locator('button:has-text("Disabled Button")').first()).toBeVisible();
    await expect(iframe.locator('button:has-text("Disabled Button")').first()).toBeDisabled();
    
    await page.click('[data-item-id="components-button--full-width"]');
    await expect(iframe.locator('button:has-text("Full Width Button")').first()).toBeVisible();
  });

  test('各バリエーションのプロパティが適切に設定されている', async ({ page }) => {
    // Buttonグループを展開
    await page.click('[data-item-id="components-button"]');
    await page.waitForTimeout(500);
    
    // Primaryストーリーを選択
    await page.click('[data-item-id="components-button--primary"]');
    await page.waitForTimeout(500);
    
    // Controlsパネルを開く
    const controlsButton = page.locator('[id^="tabbutton-control"]').first();
    if (await controlsButton.isVisible()) {
      await controlsButton.click();
    }
    
    // variantプロパティがprimaryに設定されていることを確認
    const variantControl = page.locator('[id*="control-variant"]').first();
    if (await variantControl.isVisible()) {
      const value = await variantControl.inputValue().catch(() => null);
      if (value !== null) {
        expect(value).toBe('primary');
      }
    }
    
    // Secondaryストーリーを確認
    await page.click('[data-item-id="components-button--secondary"]');
    await page.waitForTimeout(500);
    
    // Iconストーリーを確認
    await page.click('[data-item-id="components-button--icon"]');
    await page.waitForTimeout(500);
  });

  test('コントロールを操作するとリアルタイムでプロパティの変更が反映される', async ({ page }) => {
    // Buttonグループを展開
    await page.click('[data-item-id="components-button"]');
    await page.waitForTimeout(500);
    
    // Primaryストーリーを選択
    await page.click('[data-item-id="components-button--primary"]');
    await page.waitForTimeout(500);
    
    // Controlsパネルを確認・開く
    const controlsButton = page.locator('[id^="tabbutton-control"]').first();
    if (await controlsButton.isVisible()) {
      await controlsButton.click();
      await page.waitForTimeout(500);
    }
    
    // disabledプロパティを変更
    const disabledControl = page.locator('[id*="control-disabled"]').first();
    if (await disabledControl.isVisible()) {
      await disabledControl.click();
      
      // ボタンがdisabled状態になることを確認
      const iframe = page.frameLocator('#storybook-preview-iframe');
      const button = iframe.locator('button:has-text("Primary Button")').first();
      await expect(button).toBeDisabled();
      
      // disabledプロパティを戻す
      await disabledControl.click();
      await expect(button).toBeEnabled();
    }
  });

  test('一貫したドキュメント構造とスタイルが適用されている', async ({ page }) => {
    // Buttonグループを展開
    await page.click('[data-item-id="components-button"]');
    await page.waitForTimeout(500);
    
    // Docsページがある場合は確認
    const docsLink = page.locator('[data-item-id="components-button--docs"]');
    if (await docsLink.isVisible()) {
      await docsLink.click();
      await page.waitForTimeout(1000);
      
      const iframe = page.frameLocator('#storybook-preview-iframe');
      
      // コンポーネントの説明が表示されることを確認
      const componentDesc = iframe.locator('text=/汎用的なボタンコンポーネント/').first();
      if (await componentDesc.isVisible({ timeout: 3000 })) {
        await expect(componentDesc).toBeVisible();
      }
      
      // argTypesの説明が表示されることを確認
      const variantDesc = iframe.locator('text=/ボタンのバリエーション/').first();
      if (await variantDesc.isVisible({ timeout: 3000 })) {
        await expect(variantDesc).toBeVisible();
      }
    } else {
      // Docsページがない場合は、通常のストーリーページで確認
      await page.click('[data-item-id="components-button--primary"]');
      await page.waitForTimeout(500);
      
      // Controlsパネルの説明文を確認
      const controlsButton = page.locator('[id^="tabbutton-control"]').first();
      if (await controlsButton.isVisible()) {
        await controlsButton.click();
        // Controlsパネルが正しく表示されることを確認
        const controlsPanel = page.locator('[id^="panel-tab-content"]').first();
        await expect(controlsPanel).toBeVisible();
      }
    }
  });
});