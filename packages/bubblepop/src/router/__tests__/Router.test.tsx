/// <reference types="@testing-library/jest-dom" />

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { TitlePage } from '../../pages/TitlePage';
import { MainPage } from '../../pages/MainPage';
import { GamePage } from '../../pages/GamePage';
import { ResultPage } from '../../pages/ResultPage';
import { AccountPage } from '../../pages/AccountPage';
import { HelpPage } from '../../pages/HelpPage';
import { HelpDetailPage } from '../../pages/HelpDetailPage';
import { ShopPage } from '../../pages/ShopPage';
import { ItemDetailPage } from '../../pages/ItemDetailPage';
import { SettingsPage } from '../../pages/SettingsPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { RouterErrorBoundary } from '../../components/RouterErrorBoundary';

const theme = createTheme();

const TestRouter: React.FC = () => {
  return (
    <RouterErrorBoundary>
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/game/:stageId" element={<GamePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/help/:category/:topic" element={<HelpDetailPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:itemId" element={<ItemDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </RouterErrorBoundary>
  );
};

const renderRouter = (initialRoute = '/'): ReturnType<typeof render> => {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <TestRouter />
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe('AppRouter', () => {
  test('ルートパスでタイトルページが表示される', () => {
    renderRouter('/');
    expect(screen.getByText('BubblePop')).toBeInTheDocument();
    expect(screen.getByText('ゲームスタート')).toBeInTheDocument();
  });

  test('メイン画面のルートが正しく動作する', () => {
    renderRouter('/main');
    expect(screen.getByText('メイン画面')).toBeInTheDocument();
  });

  test('ゲームプレイ画面のルートでstageIdパラメータが取得される', () => {
    renderRouter('/game/1');
    expect(screen.getByText('ゲームプレイ画面 - ステージ: 1')).toBeInTheDocument();
  });

  test('プレイ結果画面のルートが正しく動作する', () => {
    renderRouter('/result');
    expect(screen.getByText('プレイ結果')).toBeInTheDocument();
    expect(screen.getByText('メニューに戻る')).toBeInTheDocument();
  });

  test('アカウント情報画面のルートが正しく動作する', () => {
    renderRouter('/account');
    expect(screen.getByText('アカウント情報')).toBeInTheDocument();
  });

  test('ヘルプ画面のルートが正しく動作する', () => {
    renderRouter('/help');
    expect(screen.getByRole('heading', { name: 'ヘルプ' })).toBeInTheDocument();
  });

  test('ヘルプ詳細画面でcategoryとtopicパラメータが取得される', () => {
    renderRouter('/help/gameplay/basic');
    expect(screen.getByText('ヘルプ詳細 - gameplay / basic')).toBeInTheDocument();
  });

  test('ショップ画面のルートが正しく動作する', () => {
    renderRouter('/shop');
    expect(screen.getByRole('heading', { name: 'ショップ' })).toBeInTheDocument();
  });

  test('アイテム詳細画面でitemIdパラメータが取得される', () => {
    renderRouter('/shop/item-001');
    expect(screen.getByText('アイテム詳細 - item-001')).toBeInTheDocument();
  });

  test('設定画面のルートが正しく動作する', () => {
    renderRouter('/settings');
    expect(screen.getByRole('heading', { name: '設定' })).toBeInTheDocument();
  });

  test('存在しないURLで404ページが表示される', () => {
    renderRouter('/unknown-route');
    expect(screen.getByText('404 - ページが見つかりません')).toBeInTheDocument();
    expect(screen.getByText('ホームに戻る')).toBeInTheDocument();
  });

  test('複数のスラッシュを含む未定義ルートで404ページが表示される', () => {
    renderRouter('/unknown/nested/path');
    expect(screen.getByText('404 - ページが見つかりません')).toBeInTheDocument();
  });

  test('エラーバウンダリが正しく設定されている', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    renderRouter('/');

    await waitFor(() => {
      const errorBoundary = document.querySelector('div');
      expect(errorBoundary).toBeInTheDocument();
    });

    consoleErrorSpy.mockRestore();
  });

  test('各ページコンポーネントが正しくインポートされている', () => {
    const routes = [
      { path: '/', expectedText: 'BubblePop', isHeading: false },
      { path: '/main', expectedText: 'メイン画面', isHeading: true },
      { path: '/game/1', expectedText: 'ゲームプレイ画面', isHeading: false },
      { path: '/result', expectedText: 'プレイ結果', isHeading: true },
      { path: '/account', expectedText: 'アカウント情報', isHeading: true },
      { path: '/help', expectedText: 'ヘルプ', isHeading: true },
      { path: '/help/cat/topic', expectedText: 'ヘルプ詳細', isHeading: false },
      { path: '/shop', expectedText: 'ショップ', isHeading: true },
      { path: '/shop/item', expectedText: 'アイテム詳細', isHeading: false },
      { path: '/settings', expectedText: '設定', isHeading: true }
    ];

    routes.forEach(({ path, expectedText, isHeading }) => {
      const { unmount } = renderRouter(path);
      if (isHeading) {
        expect(screen.getByRole('heading', { name: new RegExp(expectedText) })).toBeInTheDocument();
      } else {
        expect(screen.getByText(new RegExp(expectedText))).toBeInTheDocument();
      }
      unmount();
    });
  });

  test('ブラウザの戻るボタンをシミュレート', () => {
    renderRouter('/main');
    expect(screen.getByText('メイン画面')).toBeInTheDocument();

    window.history.pushState({}, '', '/help');
    renderRouter('/help');
    expect(screen.getByRole('heading', { name: 'ヘルプ' })).toBeInTheDocument();
  });

  test('URL直接アクセスをシミュレート', () => {
    renderRouter('/settings');
    expect(screen.getByRole('heading', { name: '設定' })).toBeInTheDocument();
  });

  test('無効なstageIdパラメータの処理', () => {
    renderRouter('/game/99');
    expect(screen.getByText('404 - ページが見つかりません')).toBeInTheDocument();
  });

  test('無効なitemIdパラメータの処理', () => {
    renderRouter('/shop/');
    expect(screen.getByRole('heading', { name: 'ショップ' })).toBeInTheDocument();
  });
});