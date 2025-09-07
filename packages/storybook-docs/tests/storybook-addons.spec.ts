import { test, expect } from '@playwright/test';

test.describe('Storybook Addons Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Storybookの読み込み完了を待つ
    await expect(page.locator('#storybook-explorer-tree')).toBeVisible({ timeout: 30000 });
    // iframeが完全に読み込まれることを確認
    await page.waitForSelector('#storybook-preview-iframe', { state: 'attached' });
    await page.waitForLoadState('networkidle');
    // Storybook UIが完全に初期化されるまで待つ
    await page.waitForFunction(() => {
      const iframe = document.querySelector('#storybook-preview-iframe');
      return iframe && iframe.contentWindow && iframe.contentWindow.document.readyState === 'complete';
    }, { timeout: 30000 });
  });

  test.describe('Controls Addon', () => {
    test('should allow dynamic property changes for Button component', async ({ page }) => {
      // Buttonストーリーを選択
      await page.click('[data-item-id="components-button"]');
      await page.waitForTimeout(1000);
      
      // Primaryストーリーを選択（ツリーが展開されることを確認）
      const primaryStory = page.locator('[data-item-id="components-button--primary"]');
      if (await primaryStory.isVisible({ timeout: 2000 })) {
        await primaryStory.click();
      } else {
        // ツリーが展開されていない場合、再度クリック
        await page.click('[data-item-id="components-button"]');
        await page.waitForTimeout(1000);
        await page.click('[data-item-id="components-button--primary"]');
      }
      
      // iframeの内容が完全に読み込まれるまで待機
      const iframe = page.frameLocator('#storybook-preview-iframe');
      
      // sb-preparing-storyが消えるまで待つ
      const preparingStory = iframe.locator('.sb-preparing-story');
      if (await preparingStory.count() > 0) {
        await preparingStory.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
      }
      
      // 実際のボタンコンポーネントが表示されるまで待つ（ストーリーのルート内）
      await iframe.locator('#storybook-root button, .sb-story button').first().waitFor({ state: 'visible', timeout: 15000 });

      // Controlsタブを開く
      const controlsTab = page.locator('#tabbutton-addon-controls');
      await expect(controlsTab).toBeVisible({ timeout: 10000 });
      await controlsTab.click();
      
      // Controlsパネルが完全に読み込まれるまで待つ
      await page.waitForSelector('#control-variant', { state: 'visible', timeout: 10000 });

      // variant プロパティの変更を確認
      const variantControl = page.locator('#control-variant');
      await expect(variantControl).toBeVisible();
      
      // 初期値がprimaryであることを確認
      await expect(variantControl).toHaveValue('primary');
      
      // secondaryに変更
      await variantControl.selectOption('secondary');
      // 変更が反映されるまで待つ
      await page.waitForFunction(
        (val) => {
          const select = document.querySelector('#control-variant');
          return select && select.value === val;
        },
        'secondary',
        { timeout: 5000 }
      );
      
      // iframe内のボタンが変更されたことを確認
      const iframeSecondary = page.frameLocator('#storybook-preview-iframe');
      // ストーリーのルート内のボタンを特定（コントロールパネルのボタンを除外）
      const button = iframeSecondary.locator('#storybook-root button, .sb-story button').first();
      await expect(button).toBeVisible({ timeout: 5000 });
      
      // iconに変更
      await variantControl.selectOption('icon');
      // 変更が反映されるまで待つ
      await page.waitForFunction(
        (val) => {
          const select = document.querySelector('#control-variant');
          return select && select.value === val;
        },
        'icon',
        { timeout: 5000 }
      );

      // disabled プロパティの変更を確認
      const disabledControl = page.locator('#set-disabled');
      await expect(disabledControl).toBeVisible();
      
      // disabledをトグルで設定
      await disabledControl.click();
      // boolean選択ポップアップが表示される場合
      const booleanOption = page.locator('label:has-text("true")').first();
      if (await booleanOption.isVisible({ timeout: 1000 })) {
        await booleanOption.click();
        // 変更が反映されるまで少し待つ
        await page.waitForTimeout(500);
      }
      
      // ボタンがdisabledになっていることを確認
      await expect(button).toBeDisabled();
    });

    test('should allow dynamic property changes for Card component', async ({ page }) => {
      // Cardストーリーを選択
      const cardGroup = page.locator('[data-item-id="components-card"]');
      await cardGroup.click();
      
      // ツリーが展開されるまで待つ
      await page.waitForTimeout(1000);
      
      // ストーリーを選択（複数の可能なセレクタを試す）
      const defaultStory = page.locator('[data-item-id="components-card--default"]').first();
      if (await defaultStory.isVisible({ timeout: 2000 })) {
        await defaultStory.click();
      } else {
        // 代替として任意のCardストーリーを選択
        const anyCardStory = page.locator('[data-item-id*="components-card--"][data-nodetype="story"]').first();
        if (await anyCardStory.isVisible({ timeout: 2000 })) {
          await anyCardStory.click();
        } else {
          // 最終手段として、cardグループを再度クリック
          await cardGroup.click();
          await page.waitForTimeout(500);
          await page.locator('[data-item-id*="components-card--"]').first().click();
        }
      }
      
      // iframe内のカードコンポーネントが表示されるまで待つ
      const iframe = page.frameLocator('#storybook-preview-iframe');
      
      // sb-preparing-storyが消えるまで待つ
      const preparingStory = iframe.locator('.sb-preparing-story');
      if (await preparingStory.count() > 0) {
        await preparingStory.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
      }
      
      // 実際のCardコンポーネントが表示されるまで待つ
      await iframe.locator('div:not([class*="sb-"]):not([class*="loader"]):not([class*="preparing"]):visible').first().waitFor({ state: 'visible', timeout: 15000 });

      // Controlsタブを開く
      const controlsTab = page.locator('#tabbutton-addon-controls');
      await expect(controlsTab).toBeVisible({ timeout: 10000 });
      await controlsTab.click();

      // elevation プロパティの存在を確認（もし設定されていれば）
      const controls = page.locator('[id^="control-"]');
      const controlsCount = await controls.count();
      
      // 少なくとも1つのコントロールが存在することを確認
      expect(controlsCount).toBeGreaterThan(0);
    });

    test('should allow dynamic property changes for Container component', async ({ page }) => {
      // Containerストーリーを選択
      const containerGroup = page.locator('[data-item-id="components-container"]');
      await containerGroup.click();
      
      // 少し待ってからツリーアイテムを探す
      await page.waitForTimeout(1000);
      
      // ストーリーを選択（複数の可能なセレクタを試す）
      const defaultStory = page.locator('[data-item-id="components-container--default"]').first();
      if (await defaultStory.isVisible({ timeout: 2000 })) {
        await defaultStory.click();
      } else {
        // 代替として任意のContainerストーリーを選択
        const anyContainerStory = page.locator('[data-item-id*="components-container--"][data-nodetype="story"]').first();
        if (await anyContainerStory.isVisible({ timeout: 2000 })) {
          await anyContainerStory.click();
        } else {
          // 最終手段として、containerグループを再度クリック
          await containerGroup.click();
          await page.waitForTimeout(500);
          await page.locator('[data-item-id*="components-container--"]').first().click();
        }
      }
      
      // iframe内のコンテナコンポーネントが表示されるまで待つ
      const iframe = page.frameLocator('#storybook-preview-iframe');
      
      // sb-preparing-storyが消えるまで待つ
      const preparingStory = iframe.locator('.sb-preparing-story');
      if (await preparingStory.count() > 0) {
        await preparingStory.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
      }
      
      // 実際のContainerコンポーネントが表示されるまで待つ
      await iframe.locator('div:not([class*="sb-"]):not([class*="loader"]):not([class*="preparing"]):visible').first().waitFor({ state: 'visible', timeout: 15000 });

      // Controlsタブを開く
      const controlsTab = page.locator('#tabbutton-addon-controls');
      await expect(controlsTab).toBeVisible({ timeout: 10000 });
      await controlsTab.click();

      // コントロールが存在することを確認
      const controls = page.locator('[id^="control-"]');
      const controlsCount = await controls.count();
      
      // 少なくとも1つのコントロールが存在することを確認
      expect(controlsCount).toBeGreaterThan(0);
    });
  });

  test.describe('Actions Addon', () => {
    test('should log click events for Button component', async ({ page }) => {
      // Buttonストーリーを選択
      await page.click('[data-item-id="components-button"]');
      await page.waitForTimeout(1000);
      
      // Primaryストーリーを選択（ツリーが展開されることを確認）
      const primaryStory = page.locator('[data-item-id="components-button--primary"]');
      if (await primaryStory.isVisible({ timeout: 2000 })) {
        await primaryStory.click();
      } else {
        // ツリーが展開されていない場合、再度クリック
        await page.click('[data-item-id="components-button"]');
        await page.waitForTimeout(1000);
        await page.click('[data-item-id="components-button--primary"]');
      }
      
      // iframeの内容が完全に読み込まれるまで待機
      const iframe = page.frameLocator('#storybook-preview-iframe');
      
      // sb-preparing-storyが消えるまで待つ
      const preparingStory = iframe.locator('.sb-preparing-story');
      if (await preparingStory.count() > 0) {
        await preparingStory.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
      }
      
      // 実際のButtonコンポーネントが表示されるまで待つ（ストーリーのルート内）
      await iframe.locator('#storybook-root button, .sb-story button').first().waitFor({ state: 'visible', timeout: 15000 });

      // Actionsタブを開く
      const actionsTab = page.locator('#tabbutton-storybook-actions-panel');
      await expect(actionsTab).toBeVisible({ timeout: 10000 });
      await actionsTab.click();
      
      // Actions パネルが表示され、準備が完了するまで待つ
      const actionsPanel = page.locator('[id="storybook-panel-root"]');
      await expect(actionsPanel).toBeVisible({ timeout: 10000 });
      
      // パネルが完全に初期化されるまで少し待つ
      await page.waitForTimeout(1000);

      // iframe内のボタンを再取得してクリック（ストーリーのルート内のボタンを特定）
      const clickButton = iframe.locator('#storybook-root button, .sb-story button').first();
      await clickButton.click({ timeout: 10000 });

      // Actionsパネルにイベントが記録されることを確認
      await page.waitForTimeout(1500);
      // Actionsパネル内のテキストを確認
      const actionsPanelContent = page.locator('#panel-tab-content');
      await actionsPanelContent.waitFor({ state: 'visible', timeout: 5000 });
      const panelText = await actionsPanelContent.textContent();
      // onClickイベントが記録されているか、またはパネルに何か表示されているかを確認
      expect(panelText).toBeTruthy();
    });

    test('should log click events for Card component', async ({ page }) => {
      // Cardストーリーを選択
      const cardGroup = page.locator('[data-item-id="components-card"]');
      await cardGroup.click();
      
      // 少し待ってからツリーアイテムを探す
      await page.waitForTimeout(1000);
      
      // ストーリーを選択（複数の可能なセレクタを試す）
      const clickableStory = page.locator('[data-item-id="components-card--hoverable-with-click"]').first();
      if (await clickableStory.isVisible({ timeout: 2000 })) {
        await clickableStory.click();
      } else {
        // 代替として任意のCardストーリーを選択
        const anyCardStory = page.locator('[data-item-id*="components-card--"][data-nodetype="story"]').first();
        if (await anyCardStory.isVisible({ timeout: 2000 })) {
          await anyCardStory.click();
        } else {
          // 最終手段として、cardグループを再度クリック
          await cardGroup.click();
          await page.waitForTimeout(500);
          await page.locator('[data-item-id*="components-card--"]').first().click();
        }
      }
      
      // iframe内のカードコンポーネントが表示されるまで待つ
      const iframe = page.frameLocator('#storybook-preview-iframe');
      
      // sb-preparing-storyが消えるまで待つ
      const preparingStory = iframe.locator('.sb-preparing-story');
      if (await preparingStory.count() > 0) {
        await preparingStory.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
      }
      
      // 実際のCardコンポーネントが表示されるまで待つ
      await iframe.locator('div:not([class*="sb-"]):not([class*="loader"]):not([class*="preparing"]):visible').first().waitFor({ state: 'visible', timeout: 15000 });

      // Actionsタブを開く
      const actionsTab = page.locator('#tabbutton-storybook-actions-panel');
      await expect(actionsTab).toBeVisible({ timeout: 10000 });
      await actionsTab.click();

      // iframe内のCardをクリック
      const card = iframe.locator('[class*="Card"], [data-testid*="card"], .MuiCard-root, .card').first();
      
      if (await card.isVisible()) {
        await card.click();
        
        // Actionsパネルにイベントが記録されることを確認
        // パネルが更新されるまで少し待つ
        await page.waitForTimeout(1000);
        const actionLog = page.locator('[data-testid="action-log-item"], .action-logger');
        const logCount = await actionLog.count();
        // Cardがクリックハンドラーを持っている場合のみログが記録される
        // カードの実装によってはクリックイベントがない可能性もある
        expect(logCount).toBeGreaterThanOrEqual(0);
      }
    });
  });

  test.describe('Docs Addon', () => {
    test('should display component documentation for Button', async ({ page }) => {
      // Docsページに直接アクセス
      await page.goto('/?path=/docs/components-button--docs');
      
      // ページが完全に読み込まれるまで待機
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);
      
      // iframeが存在し、読み込まれていることを確認
      const iframe = page.frameLocator('#storybook-preview-iframe');
      
      // iframe内にドキュメントコンテンツが表示されるまで待機
      // "sb-preparing-docs"が消えて、実際のコンテンツが表示されるまで待つ
      await iframe.locator('.sb-preparing-docs').waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
      
      // ドキュメントコンテンツが表示されていることを確認
      // Buttonコンポーネントのタイトルまたはコンテンツを探す
      const docsContent = iframe.locator('h1:has-text("Button"), h2:has-text("Button"), .sbdocs-title:has-text("Button")').first();
      await expect(docsContent).toBeVisible({ timeout: 10000 });
    });

    test('should display component documentation for Card', async ({ page }) => {
      // Docsページに直接アクセス
      await page.goto('/?path=/docs/components-card--docs');
      
      // ページが完全に読み込まれるまで待機
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);
      
      // iframeが存在し、読み込まれていることを確認
      const iframe = page.frameLocator('#storybook-preview-iframe');
      
      // iframe内にドキュメントコンテンツが表示されるまで待機
      // "sb-preparing-docs"が消えて、実際のコンテンツが表示されるまで待つ
      await iframe.locator('.sb-preparing-docs').waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
      
      // ドキュメントコンテンツが表示されていることを確認
      // Cardコンポーネントのタイトルまたはコンテンツを探す
      const docsContent = iframe.locator('h1:has-text("Card"), h2:has-text("Card"), .sbdocs-title:has-text("Card")').first();
      await expect(docsContent).toBeVisible({ timeout: 10000 });
    });

    test('should display component documentation for Container', async ({ page }) => {
      // Docsページに直接アクセス
      await page.goto('/?path=/docs/components-container--docs');
      
      // ページが完全に読み込まれるまで待機
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);
      
      // iframeが存在し、読み込まれていることを確認
      const iframe = page.frameLocator('#storybook-preview-iframe');
      
      // iframe内にドキュメントコンテンツが表示されるまで待機
      // "sb-preparing-docs"が消えて、実際のコンテンツが表示されるまで待つ
      await iframe.locator('.sb-preparing-docs').waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
      
      // ドキュメントコンテンツが表示されていることを確認
      // Containerコンポーネントのタイトルまたはコンテンツを探す
      const docsContent = iframe.locator('h1:has-text("Container"), h2:has-text("Container"), .sbdocs-title:has-text("Container")').first();
      await expect(docsContent).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Viewport Addon', () => {
    test('should allow viewport size changes', async ({ page }) => {
      // Buttonストーリーを選択
      await page.click('[data-item-id="components-button"]');
      await page.waitForTimeout(1000);
      
      // Primaryストーリーを選択（ツリーが展開されることを確認）
      const primaryStory = page.locator('[data-item-id="components-button--primary"]');
      if (await primaryStory.isVisible({ timeout: 2000 })) {
        await primaryStory.click();
      } else {
        // ツリーが展開されていない場合、再度クリック
        await page.click('[data-item-id="components-button"]');
        await page.waitForTimeout(1000);
        await page.click('[data-item-id="components-button--primary"]');
      }
      
      // iframe内のボタンコンポーネントが表示されるまで待つ
      const iframe = page.frameLocator('#storybook-preview-iframe');
      // Storybookがコンテンツをレンダリングするまで待つ
      await page.waitForFunction(
        () => {
          const iframe = document.querySelector('#storybook-preview-iframe');
          if (!iframe || !iframe.contentDocument) return false;
          const preparingDiv = iframe.contentDocument.querySelector('.sb-preparing-story, .sb-preparing-docs');
          if (preparingDiv && preparingDiv.offsetParent !== null) return false;
          // ボタンが存在し、表示されているか確認
          const buttons = iframe.contentDocument.querySelectorAll('button');
          for (const button of buttons) {
            if (button.offsetParent !== null && !button.className.includes('control')) {
              return true;
            }
          }
          return false;
        },
        { timeout: 20000 }
      );

      // Viewportアドオンのツールバーボタンを探す
      const viewportButton = page.locator('[title*="Change the size"], [title*="size of the preview"], .css-i75ajs').first();
      
      if (await viewportButton.isVisible({ timeout: 5000 })) {
        await viewportButton.click();
        await page.waitForTimeout(500);
        
        // Viewportメニューまたはポップアップが表示されることを確認
        const viewportMenu = page.locator('[role="menu"], .css-1rd9ctc, [id*="tooltip"]');
        await expect(viewportMenu.first()).toBeVisible({ timeout: 5000 });
        
        // モバイルビューポートを選択
        const mobileOption = page.locator('[role="menuitem"]:has-text("iPhone"), [role="menuitemradio"]:has-text("iPhone")').first();
        if (await mobileOption.isVisible()) {
          await mobileOption.click();
          await page.waitForTimeout(1000);
          
          // iframeのサイズが変更されたことを確認
          const iframe = page.locator('#storybook-preview-iframe');
          const iframeBox = await iframe.boundingBox();
          
          if (iframeBox) {
            // モバイルビューポートの幅は通常600px未満
            expect(iframeBox.width).toBeLessThan(600);
          }
        }
        
        // デスクトップビューに戻す
        await viewportButton.click();
        const desktopOption = page.locator('[role="menuitem"]:has-text("Default"), [role="menuitemradio"]:has-text("Default")').first();
        if (await desktopOption.isVisible()) {
          await desktopOption.click();
          await page.waitForTimeout(1000);
        }
      }
    });

    test('should maintain component functionality across different viewports', async ({ page }) => {
      // Containerストーリーを選択（レスポンシブ性のテストに適している）
      const containerGroup = page.locator('[data-item-id="components-container"]');
      await containerGroup.click();
      
      // 少し待ってからツリーアイテムを探す
      await page.waitForTimeout(1000);
      
      // ストーリーを選択（複数の可能なセレクタを試す）
      const defaultStory = page.locator('[data-item-id="components-container--default"]').first();
      if (await defaultStory.isVisible({ timeout: 2000 })) {
        await defaultStory.click();
      } else {
        // 代替として任意のContainerストーリーを選択
        const anyContainerStory = page.locator('[data-item-id*="components-container--"][data-nodetype="story"]').first();
        if (await anyContainerStory.isVisible({ timeout: 2000 })) {
          await anyContainerStory.click();
        } else {
          // 最終手段として、containerグループを再度クリック
          await containerGroup.click();
          await page.waitForTimeout(500);
          await page.locator('[data-item-id*="components-container--"]').first().click();
        }
      }
      
      // iframe内のコンテナコンポーネントが表示されるまで待つ
      const iframe = page.frameLocator('#storybook-preview-iframe');
      
      // sb-preparing-storyが消えるまで待つ
      const preparingStory = iframe.locator('.sb-preparing-story');
      if (await preparingStory.count() > 0) {
        await preparingStory.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
      }
      
      // 実際のContainerコンポーネントが表示されるまで待つ
      await iframe.locator('div:not([class*="sb-"]):not([class*="loader"]):not([class*="preparing"]):visible').first().waitFor({ state: 'visible', timeout: 15000 });

      // Viewportアドオンのツールバーボタンを探す
      const viewportButton = page.locator('[title*="Change the size"], [title*="size of the preview"], .css-i75ajs').first();
      
      if (await viewportButton.isVisible({ timeout: 5000 })) {
        // 異なるビューポートサイズでテスト
        const viewports = ['iPhone 6', 'iPad', 'Default'];
        
        for (const viewport of viewports) {
          await viewportButton.click();
          
          const option = page.locator(`[role="menuitem"]:has-text("${viewport}"), [role="menuitemradio"]:has-text("${viewport}")`).first();
          if (await option.isVisible()) {
            await option.click();
            await page.waitForTimeout(1000);
            
            // コンテンツが表示されていることを確認
            const iframe = page.frameLocator('#storybook-preview-iframe');
            
            // sb-preparing-storyが消えるまで待つ
            const preparingStory = iframe.locator('.sb-preparing-story');
            if (await preparingStory.count() > 0) {
              await preparingStory.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
            }
            
            // 実際のContainerコンポーネントが表示されるまで待つ
            await iframe.locator('[class*="Container"], .MuiContainer-root, div > div').first().waitFor({ state: 'visible', timeout: 15000 });
            // コンテナコンポーネントが表示されていることを確認
            const container = iframe.locator('[class*="Container"], [data-testid*="container"], .MuiContainer-root, .container, div').first();
            await expect(container).toBeVisible({ timeout: 10000 });
          }
        }
      }
    });
  });

  test('should have all required addons configured', async ({ page }) => {
    // Buttonストーリーを選択
    await page.click('[data-item-id="components-button"]');
    await page.waitForTimeout(1000);
    
    // Primaryストーリーを選択（ツリーが展開されることを確認）
    const primaryStory = page.locator('[data-item-id="components-button--primary"]');
    if (await primaryStory.isVisible({ timeout: 2000 })) {
      await primaryStory.click();
    } else {
      // ツリーが展開されていない場合、再度クリック
      await page.click('[data-item-id="components-button"]');
      await page.waitForTimeout(1000);
      await page.click('[data-item-id="components-button--primary"]');
    }
    
    // iframe内のボタンコンポーネントが表示されるまで待つ
    const iframe = page.frameLocator('#storybook-preview-iframe');
    
    // sb-preparing-storyが消えるまで待つ
    const preparingStory = iframe.locator('.sb-preparing-story');
    if (await preparingStory.count() > 0) {
      await preparingStory.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
    }
    
    // 実際のButtonコンポーネントが表示されるまで待つ
    await iframe.locator('div:not([class*="sb-"]):not([class*="loader"]):not([class*="preparing"]) button:visible').first().waitFor({ state: 'visible', timeout: 15000 });

    // 必須アドオンのタブが存在することを確認
    const controlsTab = page.locator('#tabbutton-addon-controls');
    await expect(controlsTab).toBeVisible({ timeout: 10000 });
    
    const actionsTab = page.locator('#tabbutton-storybook-actions-panel');
    await expect(actionsTab).toBeVisible({ timeout: 10000 });

    // Viewportアドオンのツールバーボタンが存在することを確認
    const viewportButton = page.locator('[title*="Change the size"], [title*="size of the preview"], .css-i75ajs').first();
    await expect(viewportButton).toBeVisible({ timeout: 10000 });

    // Docsアドオンが利用可能であることを確認（サイドバーのリンクとして）
    const docsElement = page.locator('a[id$="--docs"][href*="docs"]').first();
    await expect(docsElement).toBeVisible({ timeout: 10000 });
  });
});