import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navigation } from '../Navigation';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const renderWithRouter = (initialRoute = '/') => {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Navigation />
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe('Navigation', () => {
  test('ナビゲーションコンポーネントが表示される（Requirement 5.1）', () => {
    renderWithRouter();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByLabelText('メインナビゲーション')).toBeInTheDocument();
  });

  test('各画面へのリンクが表示される（Requirement 5.1）', () => {
    renderWithRouter();

    expect(screen.getByText('メイン')).toBeInTheDocument();
    expect(screen.getByText('アカウント')).toBeInTheDocument();
    expect(screen.getByText('ヘルプ')).toBeInTheDocument();
    expect(screen.getByText('ショップ')).toBeInTheDocument();
    expect(screen.getByText('設定')).toBeInTheDocument();
  });

  test('現在の画面がアクティブリンクとして表示される（Requirement 5.3）', () => {
    renderWithRouter('/main');

    const mainLink = screen.getByText('メイン').closest('a');
    expect(mainLink).toHaveAttribute('aria-current', 'page');

    const accountLink = screen.getByText('アカウント').closest('a');
    expect(accountLink).not.toHaveAttribute('aria-current');
  });

  test('異なるページでアクティブリンクが変わる（Requirement 5.3）', () => {
    const { rerender } = renderWithRouter('/account');

    const accountLink = screen.getByText('アカウント').closest('a');
    expect(accountLink).toHaveAttribute('aria-current', 'page');

    const mainLink = screen.getByText('メイン').closest('a');
    expect(mainLink).not.toHaveAttribute('aria-current');
  });

  test('各リンクが正しいパスを持っている（Requirement 5.2）', () => {
    renderWithRouter();

    expect(screen.getByText('メイン').closest('a')).toHaveAttribute('href', '/main');
    expect(screen.getByText('アカウント').closest('a')).toHaveAttribute('href', '/account');
    expect(screen.getByText('ヘルプ').closest('a')).toHaveAttribute('href', '/help');
    expect(screen.getByText('ショップ').closest('a')).toHaveAttribute('href', '/shop');
    expect(screen.getByText('設定').closest('a')).toHaveAttribute('href', '/settings');
  });

  test('キーボードナビゲーションが可能（Requirement 5.4）', () => {
    renderWithRouter();

    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('tabIndex', '0');
    });
  });

  test('アクセシビリティ属性が設定されている（Requirement 5.4）', () => {
    renderWithRouter('/help');

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'メインナビゲーション');

    const helpLink = screen.getByText('ヘルプ').closest('a');
    expect(helpLink).toHaveAttribute('aria-current', 'page');
  });
});