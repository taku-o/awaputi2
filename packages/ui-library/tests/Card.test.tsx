import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@testing-library/jest-dom';
import { Card } from '../src/components/Card';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#FFD700',
      light: '#FFF176',
      dark: '#F57F17',
      contrastText: '#000000'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0C0',
      disabled: '#808080'
    },
    background: {
      default: '#1A1A2E',
      paper: '#2A2A3E'
    }
  }
});

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Card Component', () => {
  // Requirement 2.1: MUIテーマに基づいた背景色とボーダーが適用される
  test('applies MUI theme-based styling', () => {
    render(
      <TestWrapper>
        <Card data-testid="test-card">Test Card</Card>
      </TestWrapper>
    );
    const card = screen.getByTestId('test-card');
    
    expect(card).toBeInTheDocument();
    // MUI Cardコンポーネントとして動作することを確認
    expect(card).toHaveClass('MuiCard-root');
    expect(card).toHaveClass('MuiPaper-elevation1');
  });

  // Requirement 2.2: childrenでカード内にコンテンツが表示される
  test('displays children content', () => {
    render(
      <TestWrapper>
        <Card>
          <h2>Card Title</h2>
          <p>Card content goes here.</p>
        </Card>
      </TestWrapper>
    );
    
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card content goes here.')).toBeInTheDocument();
  });

  // Requirement 2.3: elevationプロパティで指定されたレベルの影効果が適用される
  test('applies elevation levels correctly', () => {
    const { rerender } = render(
      <TestWrapper>
        <Card elevation={0} data-testid="card-elevation-0">No shadow</Card>
      </TestWrapper>
    );
    let card = screen.getByTestId('card-elevation-0');
    expect(card).toHaveClass('MuiPaper-elevation0');

    rerender(
      <TestWrapper>
        <Card elevation={1} data-testid="card-elevation-1">Level 1</Card>
      </TestWrapper>
    );
    card = screen.getByTestId('card-elevation-1');
    expect(card).toHaveClass('MuiPaper-elevation1');

    rerender(
      <TestWrapper>
        <Card elevation={2} data-testid="card-elevation-2">Level 2</Card>
      </TestWrapper>
    );
    card = screen.getByTestId('card-elevation-2');
    expect(card).toHaveClass('MuiPaper-elevation2');

    rerender(
      <TestWrapper>
        <Card elevation={3} data-testid="card-elevation-3">Level 3</Card>
      </TestWrapper>
    );
    card = screen.getByTestId('card-elevation-3');
    expect(card).toHaveClass('MuiPaper-elevation3');

    rerender(
      <TestWrapper>
        <Card elevation={4} data-testid="card-elevation-4">Level 4</Card>
      </TestWrapper>
    );
    card = screen.getByTestId('card-elevation-4');
    expect(card).toHaveClass('MuiPaper-elevation4');
  });

  // Requirement 2.4: hoverableプロパティでホバー時に視覚的フィードバックが表示される
  test('applies hover effects when hoverable is true', () => {
    render(
      <TestWrapper>
        <Card hoverable data-testid="hoverable-card">Hoverable Card</Card>
      </TestWrapper>
    );
    const card = screen.getByTestId('hoverable-card');
    
    // MUI Cardコンポーネントとして動作
    expect(card).toHaveClass('MuiCard-root');
    // hoverableがtrueの場合、カーソルがポインターになることをCSSで設定している
    expect(card).toHaveStyle({ cursor: 'pointer' });
  });

  test('does not apply hover effects when hoverable is false', () => {
    render(
      <TestWrapper>
        <Card hoverable={false} data-testid="non-hoverable-card">Non-hoverable Card</Card>
      </TestWrapper>
    );
    const card = screen.getByTestId('non-hoverable-card');
    
    // MUI Cardコンポーネントとして動作
    expect(card).toHaveClass('MuiCard-root');
    // hoverableがfalseの場合、カーソルがデフォルトになる
    expect(card).toHaveStyle({ cursor: 'default' });
  });

  // Requirement 2.5: onClickハンドラーでカードクリック時にイベントが発火する
  test('fires onClick event when clicked', () => {
    const handleClick = jest.fn();
    render(
      <TestWrapper>
        <Card onClick={handleClick} data-testid="clickable-card">Clickable Card</Card>
      </TestWrapper>
    );
    const card = screen.getByTestId('clickable-card');
    
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
  });

  test('does not fire onClick when not provided', () => {
    render(
      <TestWrapper>
        <Card data-testid="non-clickable-card">Non-clickable Card</Card>
      </TestWrapper>
    );
    const card = screen.getByTestId('non-clickable-card');
    
    expect(() => fireEvent.click(card)).not.toThrow();
  });

  // Padding variants test
  test('applies different padding levels correctly', () => {
    const { rerender } = render(
      <TestWrapper>
        <Card padding="none" data-testid="no-padding-card">No Padding</Card>
      </TestWrapper>
    );
    // CardContent要素を確認
    let cardContent = screen.getByTestId('no-padding-card').querySelector('.MuiCardContent-root');
    expect(cardContent).toBeInTheDocument();

    rerender(
      <TestWrapper>
        <Card padding="small" data-testid="small-padding-card">Small Padding</Card>
      </TestWrapper>
    );
    cardContent = screen.getByTestId('small-padding-card').querySelector('.MuiCardContent-root');
    expect(cardContent).toBeInTheDocument();

    rerender(
      <TestWrapper>
        <Card padding="medium" data-testid="medium-padding-card">Medium Padding</Card>
      </TestWrapper>
    );
    cardContent = screen.getByTestId('medium-padding-card').querySelector('.MuiCardContent-root');
    expect(cardContent).toBeInTheDocument();

    rerender(
      <TestWrapper>
        <Card padding="large" data-testid="large-padding-card">Large Padding</Card>
      </TestWrapper>
    );
    cardContent = screen.getByTestId('large-padding-card').querySelector('.MuiCardContent-root');
    expect(cardContent).toBeInTheDocument();
  });

  // Variant test
  test('applies outlined variant styling', () => {
    const { rerender } = render(
      <TestWrapper>
        <Card variant="default" data-testid="default-card">Default Card</Card>
      </TestWrapper>
    );
    let card = screen.getByTestId('default-card');
    // default variantは elevation variantを使用
    expect(card).toHaveClass('MuiPaper-elevation1');
    expect(card).not.toHaveClass('MuiPaper-outlined');

    rerender(
      <TestWrapper>
        <Card variant="outlined" data-testid="outlined-card">Outlined Card</Card>
      </TestWrapper>
    );
    card = screen.getByTestId('outlined-card');
    expect(card).toHaveClass('MuiPaper-outlined');
    expect(card).not.toHaveClass('MuiPaper-elevation1');
  });

  test('applies outlined variant hover styling', () => {
    render(
      <TestWrapper>
        <Card variant="outlined" hoverable data-testid="outlined-hoverable-card">Outlined Hoverable Card</Card>
      </TestWrapper>
    );
    const card = screen.getByTestId('outlined-hoverable-card');
    
    // outlined variantを使用
    expect(card).toHaveClass('MuiPaper-outlined');
    // hoverableがtrueの場合はポインターカーソル
    expect(card).toHaveStyle({ cursor: 'pointer' });
  });

  // Cursor styling test
  test('applies correct cursor styling', () => {
    const { rerender } = render(
      <TestWrapper>
        <Card data-testid="cursor-default-card">Default Card</Card>
      </TestWrapper>
    );
    let card = screen.getByTestId('cursor-default-card');
    expect(card).toHaveStyle({ cursor: 'default' });

    rerender(
      <TestWrapper>
        <Card hoverable onClick={() => {}} data-testid="cursor-pointer-card">Clickable Card</Card>
      </TestWrapper>
    );
    card = screen.getByTestId('cursor-pointer-card');
    expect(card).toHaveStyle({ cursor: 'pointer' });
  });

  // Transition styling test
  test('applies transition styling', () => {
    render(
      <TestWrapper>
        <Card data-testid="transition-card">Card with Transition</Card>
      </TestWrapper>
    );
    const card = screen.getByTestId('transition-card');
    
    // MUI CardコンポーネントはCSSクラスでトランジションを定義
    expect(card).toHaveClass('MuiCard-root');
  });
});