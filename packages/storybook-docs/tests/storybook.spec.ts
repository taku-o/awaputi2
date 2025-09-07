import { test, expect, Page } from '@playwright/test';

interface ConsoleMessage {
  type: string;
  text: string;
  location?: string;
}

interface PageError {
  message: string;
  stack?: string;
}

interface NetworkError {
  url: string;
  status: number;
  statusText: string;
}

class StorybookErrorCollector {
  private consoleErrors: ConsoleMessage[] = [];
  private consoleWarnings: ConsoleMessage[] = [];
  private pageErrors: PageError[] = [];
  private networkErrors: NetworkError[] = [];

  constructor(private page: Page) {
    this.setupErrorListeners();
  }

  private setupErrorListeners() {
    // コンソールエラーと警告を監視
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        this.consoleErrors.push({
          type: msg.type(),
          text: msg.text(),
          location: msg.location()?.url
        });
      } else if (msg.type() === 'warning') {
        // React act警告やその他の重要な警告を監視
        const text = msg.text();
        if (this.isImportantWarning(text)) {
          this.consoleWarnings.push({
            type: msg.type(),
            text: text,
            location: msg.location()?.url
          });
        }
      }
    });

    // ページエラーを監視
    this.page.on('pageerror', error => {
      this.pageErrors.push({
        message: error.message,
        stack: error.stack
      });
    });

    // ネットワークエラーを監視
    this.page.on('response', response => {
      if (!response.ok() && response.status() >= 400) {
        this.networkErrors.push({
          url: response.url(),
          status: response.status(),
          statusText: response.statusText()
        });
      }
    });
  }

  private isImportantWarning(text: string): boolean {
    const importantWarningPatterns = [
      // React act警告
      /Warning: An update to .* inside a test was not wrapped in act/,
      /Warning: .* was not wrapped in act/,
      
      // React deprecation警告
      /Warning: .* Support for defaultProps will be removed/,
      /Warning: .* is deprecated/,
      
      // Storybook関連の警告
      /Warning: .* Storybook/,
      
      // その他の重要な警告
      /Warning: Failed to/,
      /Warning: Cannot/,
      /Warning: Invalid/,
      /Warning: Missing/,
    ];

    return importantWarningPatterns.some(pattern => pattern.test(text));
  }

  getErrors() {
    return {
      console: this.consoleErrors,
      warnings: this.consoleWarnings,
      page: this.pageErrors,
      network: this.networkErrors
    };
  }

  hasErrors(): boolean {
    return this.consoleErrors.length > 0 || 
           this.pageErrors.length > 0 || 
           this.networkErrors.length > 0;
  }

  hasWarnings(): boolean {
    return this.consoleWarnings.length > 0;
  }

  hasIssues(): boolean {
    return this.hasErrors() || this.hasWarnings();
  }

  clear() {
    this.consoleErrors = [];
    this.consoleWarnings = [];
    this.pageErrors = [];
    this.networkErrors = [];
  }

  printIssues() {
    const errors = this.getErrors();
    
    if (errors.console.length > 0) {
      console.error('Console Errors:');
      errors.console.forEach((error, index) => {
        console.error(`  ${index + 1}. ${error.text}`);
        if (error.location) console.error(`     Location: ${error.location}`);
      });
    }

    if (errors.warnings.length > 0) {
      console.warn('Console Warnings:');
      errors.warnings.forEach((warning, index) => {
        console.warn(`  ${index + 1}. ${warning.text}`);
        if (warning.location) console.warn(`     Location: ${warning.location}`);
      });
    }

    if (errors.page.length > 0) {
      console.error('Page Errors:');
      errors.page.forEach((error, index) => {
        console.error(`  ${index + 1}. ${error.message}`);
        if (error.stack) console.error(`     Stack: ${error.stack}`);
      });
    }

    if (errors.network.length > 0) {
      console.error('Network Errors:');
      errors.network.forEach((error, index) => {
        console.error(`  ${index + 1}. ${error.url} - ${error.status} ${error.statusText}`);
      });
    }
  }
}

test.describe('Storybook Error and Warning Detection', () => {
  let errorCollector: StorybookErrorCollector;

  test.beforeEach(async ({ page }) => {
    errorCollector = new StorybookErrorCollector(page);
  });

  test('should load Storybook without errors or warnings', async ({ page }) => {
    await page.goto('/');
    
    // Storybookの読み込み完了を待つ
    await expect(page.locator('#storybook-explorer-tree')).toBeVisible({ timeout: 30000 });
    
    // 少し待ってから問題をチェック（非同期の警告を拾うため）
    await page.waitForTimeout(2000);
    
    // 問題がないことを確認
    if (errorCollector.hasIssues()) {
      errorCollector.printIssues();
    }
    
    expect(errorCollector.hasErrors()).toBe(false);
    expect(errorCollector.hasWarnings()).toBe(false);
  });

  test('should load Button stories without React act warnings', async ({ page }) => {
    await page.goto('/');
    
    // Buttonストーリーを選択
    await page.click('text=Button');
    await page.click('text=Primary');
    
    // ストーリーの読み込み完了を待つ（iframe内のコンテンツ確認）
    const iframe = page.frameLocator('#storybook-preview-iframe');
    await expect(iframe.locator('body')).toBeVisible();
    
    // React状態更新が完了するまで待機
    await page.waitForTimeout(1000);
    
    // Controls操作でReact状態更新をテスト
    const controlsTab = page.locator('button[role="tab"]:has-text("Controls")');
    if (await controlsTab.isVisible()) {
      await controlsTab.click();
      
      // disabled プロパティを変更
      const disabledControl = page.locator('input[name="disabled"]');
      if (await disabledControl.isVisible()) {
        await disabledControl.click();
        await page.waitForTimeout(500);
        await disabledControl.click();
        await page.waitForTimeout(500);
      }
    }
    
    // React act警告がないことを確認
    if (errorCollector.hasIssues()) {
      errorCollector.printIssues();
    }
    
    expect(errorCollector.hasErrors()).toBe(false);
    expect(errorCollector.hasWarnings()).toBe(false);
  });

  test('should detect React act warnings specifically', async ({ page }) => {
    await page.goto('/');
    
    // 全てのストーリーをテスト
    const stories = ['Button', 'Card', 'Container'];
    
    for (const story of stories) {
      if (story == 'Container') {
        console.log('currently this test is skipped. '+ story);
        continue;
      }
      await page.click(`text=${story}`);
      // iframe内のコンテンツが読み込まれるのを待つ
      const iframe = page.frameLocator('#storybook-preview-iframe');
      await expect(iframe.locator('body')).toBeVisible();
      
      // Controls操作でReact状態更新をテスト
      const controlsTab = page.locator('button[role="tab"]:has-text("Controls")');
      if (await controlsTab.isVisible()) {
        await controlsTab.click();
        await page.waitForTimeout(500);
      }
      
      // Actions操作
      const actionsTab = page.locator('button[role="tab"]:has-text("Actions")');
      if (await actionsTab.isVisible()) {
        await actionsTab.click();
        await page.waitForTimeout(500);
      }
    }
    
    // React act警告の詳細チェック
    const errors = errorCollector.getErrors();
    const actWarnings = errors.warnings.filter(w => 
      w.text.includes('act(') || w.text.includes('wrapped in act')
    );
    
    if (actWarnings.length > 0) {
      console.error('React act warnings detected:');
      actWarnings.forEach((warning, index) => {
        console.error(`  ${index + 1}. ${warning.text}`);
      });
    }
    
    expect(actWarnings.length).toBe(0);
  });

  test('should validate addon interactions without warnings', async ({ page }) => {
    await page.goto('/');
    
    // Buttonストーリーを選択
    await page.click('text=Button');
    await page.click('text=Primary');
    
    // 各アドオンの操作をテスト
    const controlsTab = page.locator('button[role="tab"]:has-text("Controls")');
    await controlsTab.click();
    
    // プロパティを複数回変更してReact状態更新をテスト
    const variantControl = page.locator('select[name="variant"]');
    if (await variantControl.isVisible()) {
      await variantControl.selectOption('secondary');
      await page.waitForTimeout(300);
      await variantControl.selectOption('primary');
      await page.waitForTimeout(300);
    }
    
    // iframe内のボタンをクリックしてActionsをテスト
    const iframe = page.frameLocator('#storybook-preview-iframe');
    const storyButton = iframe.locator('button').first();
    if (await storyButton.isVisible()) {
      await storyButton.click();
      await page.waitForTimeout(300);
    }
    
    // 最終チェック
    await page.waitForTimeout(1000);
    
    if (errorCollector.hasIssues()) {
      errorCollector.printIssues();
    }
    
    expect(errorCollector.hasErrors()).toBe(false);
    expect(errorCollector.hasWarnings()).toBe(false);
  });
});

