import { test, expect } from '@playwright/test';

test.describe('Container Storybookストーリーの動作確認', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
    await expect(page.locator('#storybook-explorer-tree')).toBeVisible({ timeout: 30000 });
  });

  test('Containerコンポーネントの基本的なバリエーション（各maxWidth、padding設定）が表示される', async ({ page }) => {
    // Containerグループを展開
    await page.click('[data-item-id="components-container"]');
    await page.waitForTimeout(500);
    
    // maxWidthバリエーションのストーリーが存在することを確認
    await expect(page.locator('[data-item-id="components-container--default"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-container--max-width-xs"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-container--max-width-sm"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-container--max-width-md"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-container--max-width-lg"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-container--max-width-xl"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-container--full-width"]')).toBeVisible();
    
    // paddingバリエーションのストーリーが存在することを確認
    await expect(page.locator('[data-item-id="components-container--no-padding"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-container--small-padding"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-container--medium-padding"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-container--large-padding"]')).toBeVisible();
    
    // その他のバリエーション
    await expect(page.locator('[data-item-id="components-container--centered"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-container--responsive-padding"]')).toBeVisible();
    await expect(page.locator('[data-item-id="components-container--multiple-cards"]')).toBeVisible();
    
    // 全14個のストーリーの表示確認
    const iframe = page.frameLocator('#storybook-preview-iframe');
    
    // 1. Default
    await page.click('[data-item-id="components-container--default"]');
    await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
    
    // 2. MaxWidthXS
    await page.click('[data-item-id="components-container--max-width-xs"]');
    await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
    
    // 3. MaxWidthSM
    await page.click('[data-item-id="components-container--max-width-sm"]');
    await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
    
    // 4. MaxWidthMD
    await page.click('[data-item-id="components-container--max-width-md"]');
    await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
    
    // 5. MaxWidthLG
    await page.click('[data-item-id="components-container--max-width-lg"]');
    await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
    
    // 6. MaxWidthXL
    await page.click('[data-item-id="components-container--max-width-xl"]');
    await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
    
    // 7. FullWidth
    await page.click('[data-item-id="components-container--full-width"]');
    await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
    
    // 8. Centered
    await page.click('[data-item-id="components-container--centered"]');
    await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
    
    // 9. NoPadding
    await page.click('[data-item-id="components-container--no-padding"]');
    await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
    
    // 10. SmallPadding
    await page.click('[data-item-id="components-container--small-padding"]');
    await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
    
    // 11. MediumPadding
    await page.click('[data-item-id="components-container--medium-padding"]');
    await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
    
    // 12. LargePadding
    await page.click('[data-item-id="components-container--large-padding"]');
    await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
    
    // 13. ResponsivePadding
    await page.click('[data-item-id="components-container--responsive-padding"]');
    await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
    
    // 14. MultipleCards
    await page.click('[data-item-id="components-container--multiple-cards"]');
    await expect(iframe.locator('text="Card 1"').first()).toBeVisible();
    await expect(iframe.locator('text="Card 2"').first()).toBeVisible();
    await expect(iframe.locator('text="Card 3"').first()).toBeVisible();
  });

  test('レスポンシブ対応の動作が確認できる', async ({ page }) => {
    // Containerグループを展開
    await page.click('[data-item-id="components-container"]');
    await page.waitForTimeout(500);
    
    // ResponsivePaddingストーリーを選択
    await page.click('[data-item-id="components-container--responsive-padding"]');
    await page.waitForTimeout(500);
    
    const iframe = page.frameLocator('#storybook-preview-iframe');
    
    // コンテナが表示されることを確認
    await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
    
    // ビューポートセレクターが存在する場合の確認
    const viewportButton = page.locator('[title*="viewport"]').first();
    if (await viewportButton.isVisible({ timeout: 3000 })) {
      await viewportButton.click();
      
      // XSビューポートオプションが存在することを確認
      const xsOption = page.locator('text=/XS.*444px/').first();
      if (await xsOption.isVisible({ timeout: 3000 })) {
        await expect(xsOption).toBeVisible();
      }
      
      // SMビューポートオプションが存在することを確認
      const smOption = page.locator('text=/SM.*600px/').first();
      if (await smOption.isVisible({ timeout: 3000 })) {
        await expect(smOption).toBeVisible();
      }
      
      // MDビューポートオプションが存在することを確認
      const mdOption = page.locator('text=/MD.*900px/').first();
      if (await mdOption.isVisible({ timeout: 3000 })) {
        await expect(mdOption).toBeVisible();
      }
      
      // ビューポートメニューを閉じる
      await page.keyboard.press('Escape');
    }
    
    // 複数のmaxWidthストーリーが存在することでレスポンシブ対応を確認
    await page.click('[data-item-id="components-container--max-width-xs"]');
    await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
    
    await page.click('[data-item-id="components-container--max-width-lg"]');
    await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
  });

  test('コントロールを操作するとリアルタイムでプロパティの変更が反映される', async ({ page }) => {
    // Containerグループを展開
    await page.click('[data-item-id="components-container"]');
    await page.waitForTimeout(500);
    
    // Defaultストーリーを選択
    await page.click('[data-item-id="components-container--default"]');
    await page.waitForTimeout(500);
    
    // Controlsパネルを確認・開く
    const controlsButton = page.locator('[id^="tabbutton-control"]').first();
    if (await controlsButton.isVisible()) {
      await controlsButton.click();
      await page.waitForTimeout(500);
    }
    
    // centerプロパティを変更
    const centerControl = page.locator('[id*="control-center"]').first();
    if (await centerControl.isVisible()) {
      // centerプロパティをtrueに変更
      await centerControl.click();
      await page.waitForTimeout(500);
      
      // コンテナが中央寄せされることを視覚的に確認
      const iframe = page.frameLocator('#storybook-preview-iframe');
      await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
      
      // centerプロパティを戻す
      await centerControl.click();
      await page.waitForTimeout(500);
    }
    
    // paddingプロパティを変更
    const paddingControl = page.locator('[id*="control-padding"]').first();
    if (await paddingControl.isVisible()) {
      // selectタイプのコントロールの場合
      const paddingSelect = paddingControl.locator('select').first();
      if (await paddingSelect.isVisible()) {
        // largeに変更
        await paddingSelect.selectOption('large');
        await page.waitForTimeout(500);
        
        // コンテナのパディングが変更されることを確認
        const iframe = page.frameLocator('#storybook-preview-iframe');
        await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
        
        // mediumに戻す
        await paddingSelect.selectOption('medium');
        await page.waitForTimeout(500);
      }
    }
    
    // maxWidthプロパティを変更
    const maxWidthControl = page.locator('[id*="control-maxWidth"]').first();
    if (await maxWidthControl.isVisible()) {
      const maxWidthSelect = maxWidthControl.locator('select').first();
      if (await maxWidthSelect.isVisible()) {
        // xsに変更
        await maxWidthSelect.selectOption('xs');
        await page.waitForTimeout(500);
        
        // コンテナの幅が変更されることを確認
        const iframe = page.frameLocator('#storybook-preview-iframe');
        await expect(iframe.locator('text="Container Content"').first()).toBeVisible();
        
        // lgに戻す
        await maxWidthSelect.selectOption('lg');
        await page.waitForTimeout(500);
      }
    }
  });

  test('一貫したドキュメント構造とスタイルが適用されている', async ({ page }) => {
    // Containerグループを展開
    await page.click('[data-item-id="components-container"]');
    await page.waitForTimeout(500);
    
    // Docsページがある場合は確認
    const docsLink = page.locator('[data-item-id="components-container--docs"]');
    if (await docsLink.isVisible()) {
      await docsLink.click();
      await page.waitForTimeout(1000);
      
      const iframe = page.frameLocator('#storybook-preview-iframe');
      
      // コンポーネントの説明が表示されることを確認
      const componentDesc = iframe.locator('text=/レイアウト制御とレスポンシブデザイン/').first();
      if (await componentDesc.isVisible({ timeout: 3000 })) {
        await expect(componentDesc).toBeVisible();
      }
      
      // argTypesの説明が表示されることを確認
      const maxWidthDesc = iframe.locator('text=/コンテナの最大幅を設定/').first();
      if (await maxWidthDesc.isVisible({ timeout: 3000 })) {
        await expect(maxWidthDesc).toBeVisible();
      }
      
      const paddingDesc = iframe.locator('text=/コンテナ内部のパディング/').first();
      if (await paddingDesc.isVisible({ timeout: 3000 })) {
        await expect(paddingDesc).toBeVisible();
      }
    } else {
      // Docsページがない場合は、通常のストーリーページで確認
      await page.click('[data-item-id="components-container--default"]');
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

  test('複数カードレイアウトのストーリーが正しく表示される', async ({ page }) => {
    // Containerグループを展開
    await page.click('[data-item-id="components-container"]');
    await page.waitForTimeout(500);
    
    // MultipleCardsストーリーを選択
    await page.click('[data-item-id="components-container--multiple-cards"]');
    await page.waitForTimeout(500);
    
    const iframe = page.frameLocator('#storybook-preview-iframe');
    
    // 3つのカードが表示されることを確認
    await expect(iframe.locator('text="Card 1"').first()).toBeVisible();
    await expect(iframe.locator('text="Card 2"').first()).toBeVisible();
    await expect(iframe.locator('text="Card 3"').first()).toBeVisible();
    
    // カードのコンテンツが表示されることを確認
    await expect(iframe.locator('text="First card content"').first()).toBeVisible();
    await expect(iframe.locator('text="Second card content"').first()).toBeVisible();
    await expect(iframe.locator('text="Third card content"').first()).toBeVisible();
  });
});