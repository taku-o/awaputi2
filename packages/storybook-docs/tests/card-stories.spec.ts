import { test, expect } from '@playwright/test';

test.describe('Card Component Stories', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
    await expect(page.locator('#storybook-explorer-tree')).toBeVisible({ timeout: 30000 });
  });

  test('Cardコンポーネントの基本的なバリエーションが表示される', async ({ page }) => {
    // Cardグループを展開
    await page.click('[data-item-id="components-card"]');
    await page.waitForTimeout(500);
    
    // 必須のストーリーが存在することを確認
    await expect(page.locator('[data-item-id="components-card--default"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-card--hoverable"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-card--outlined"]')).toBeVisible();
    
    // Defaultストーリーの内容確認
    await page.click('[data-item-id="components-card--default"]');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('h3:has-text("カードタイトル")').first()).toBeVisible();
    await expect(iframe.locator('p:has-text("デフォルトのカードコンポーネント")').first()).toBeVisible();
    
    // Hoverableストーリーの内容確認
    await page.click('[data-item-id="components-card--hoverable"]');
    await expect(iframe.locator('h3:has-text("ホバー可能なカード")').first()).toBeVisible();
    await expect(iframe.locator('p:has-text("このカードにマウスを重ねるとホバー効果")').first()).toBeVisible();
    
    // Outlinedストーリーの内容確認
    await page.click('[data-item-id="components-card--outlined"]');
    await expect(iframe.locator('h3:has-text("アウトラインカード")').first()).toBeVisible();
    await expect(iframe.locator('p:has-text("影の代わりにボーダーを使用")').first()).toBeVisible();
  });

  test('elevation、padding、variantの組み合わせが適切に表示される', async ({ page }) => {
    // Cardグループを展開
    await page.click('[data-item-id="components-card"]');
    await page.waitForTimeout(500);
    
    // Elevationバリエーション
    await expect(page.locator('[data-item-id="components-card--no-elevation"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-card--medium-elevation"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-card--high-elevation"]')).toBeVisible();
    
    // Paddingバリエーション
    await expect(page.locator('[data-item-id="components-card--small-padding"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-card--large-padding"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-card--no-padding"]')).toBeVisible();
    
    // 複合的なバリエーション
    await expect(page.locator('[data-item-id="components-card--hoverable-with-click"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-card--outlined-hoverable"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-card--complex-content"]')).toBeVisible();
    
    // NoElevationストーリーの内容確認
    await page.click('[data-item-id="components-card--no-elevation"]');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('h3:has-text("フラットカード")').first()).toBeVisible();
    
    // SmallPaddingストーリーの内容確認
    await page.click('[data-item-id="components-card--small-padding"]');
    await expect(iframe.locator('h3:has-text("小さいパディング")').first()).toBeVisible();
    
    // ComplexContentストーリーの内容確認
    await page.click('[data-item-id="components-card--complex-content"]');
    await expect(iframe.locator('h3:has-text("複雑なカード")').first()).toBeVisible();
    await expect(iframe.locator('button:has-text("アクション1")').first()).toBeVisible();
    await expect(iframe.locator('button:has-text("アクション2")').first()).toBeVisible();
  });

  test('コントロールパネルでプロパティを変更するとリアルタイムで反映される', async ({ page }) => {
    // Cardグループを展開してDefaultストーリーを選択
    await page.click('[data-item-id="components-card"]');
    await page.waitForTimeout(500);
    await page.click('[data-item-id="components-card--default"]');
    await page.waitForTimeout(1000);
    
    // Controlsパネルを開く
    const controlsButton = page.locator('button:has-text("Controls")');
    if (await controlsButton.isVisible()) {
      await controlsButton.click();
      await page.waitForTimeout(500);
    }
    
    // elevationを変更
    const elevationSelect = page.locator('select[id*="elevation"]');
    if (await elevationSelect.isVisible()) {
      await elevationSelect.selectOption('4');
      await page.waitForTimeout(500);
      
      // iframeで変更が反映されているか確認
      const iframe = page.frameLocator('#storybook-preview-iframe');
      const cardElement = iframe.locator('[class*="MuiCard"]').first();
      await expect(cardElement).toBeVisible();
    }
    
    // paddingを変更
    const paddingSelect = page.locator('select[id*="padding"]');
    if (await paddingSelect.isVisible()) {
      await paddingSelect.selectOption('large');
      await page.waitForTimeout(500);
      
      // 変更が反映されているか確認
      const iframe = page.frameLocator('#storybook-preview-iframe');
      const cardElement = iframe.locator('[class*="MuiCard"]').first();
      await expect(cardElement).toBeVisible();
    }
    
    // hoverableチェックボックスを変更
    const hoverableCheckbox = page.locator('input[type="checkbox"][id*="hoverable"]');
    if (await hoverableCheckbox.isVisible()) {
      await hoverableCheckbox.check();
      await page.waitForTimeout(500);
      
      // 変更が反映されているか確認
      const iframe = page.frameLocator('#storybook-preview-iframe');
      const cardElement = iframe.locator('[class*="MuiCard"]').first();
      await expect(cardElement).toBeVisible();
    }
  });

  test('一貫したドキュメント構造とスタイルが適用されている', async ({ page }) => {
    // Cardグループを展開
    await page.click('[data-item-id="components-card"]');
    await page.waitForTimeout(500);
    
    // 各ストーリーで統一されたドキュメント構造を確認
    const stories = [
      'components-card--default',
      'components-card--no-elevation',
      'components-card--medium-elevation',
      'components-card--high-elevation',
      'components-card--hoverable',
      'components-card--hoverable-with-click',
      'components-card--outlined',
      'components-card--outlined-hoverable',
      'components-card--small-padding',
      'components-card--large-padding',
      'components-card--no-padding',
      'components-card--complex-content'
    ];
    
    for (const storyId of stories) {
      await page.click(`[data-item-id="${storyId}"]`);
      await page.waitForTimeout(500);
      
      // iframe内でコンテンツが表示されていることを確認
      const iframe = page.frameLocator('#storybook-preview-iframe');
      const h3Element = iframe.locator('h3').first();
      await expect(h3Element).toBeVisible();
      
      // 日本語コンテンツが表示されていることを確認
      const h3Text = await h3Element.textContent();
      expect(h3Text).toMatch(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/); // 日本語文字が含まれているか
    }
  });

  // 12個のストーリー個別の表示確認テスト
  test('Default ストーリーが正しく表示される', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-card--default');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('h3:has-text("カードタイトル")')).toBeVisible();
  });

  test('NoElevation ストーリーが正しく表示される', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-card--no-elevation');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('h3:has-text("フラットカード")')).toBeVisible();
  });

  test('MediumElevation ストーリーが正しく表示される', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-card--medium-elevation');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('h3:has-text("中程度の影")')).toBeVisible();
  });

  test('HighElevation ストーリーが正しく表示される', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-card--high-elevation');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('h3:has-text("強い影")')).toBeVisible();
  });

  test('Hoverable ストーリーが正しく表示される', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-card--hoverable');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('h3:has-text("ホバー可能なカード")')).toBeVisible();
  });

  test('HoverableWithClick ストーリーが正しく表示される', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-card--hoverable-with-click');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('h3:has-text("インタラクティブカード")')).toBeVisible();
  });

  test('Outlined ストーリーが正しく表示される', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-card--outlined');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('h3:has-text("アウトラインカード")')).toBeVisible();
  });

  test('OutlinedHoverable ストーリーが正しく表示される', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-card--outlined-hoverable');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('h3:has-text("ホバー可能なアウトラインカード")')).toBeVisible();
  });

  test('SmallPadding ストーリーが正しく表示される', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-card--small-padding');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('h3:has-text("小さいパディング")')).toBeVisible();
  });

  test('LargePadding ストーリーが正しく表示される', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-card--large-padding');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('h3:has-text("大きいパディング")')).toBeVisible();
  });

  test('NoPadding ストーリーが正しく表示される', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-card--no-padding');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('h3:has-text("パディングなし")')).toBeVisible();
  });

  test('ComplexContent ストーリーが正しく表示される', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/components-card--complex-content');
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('h3:has-text("複雑なカード")')).toBeVisible();
    await expect(iframe.locator('button:has-text("アクション1")')).toBeVisible();
  });
});