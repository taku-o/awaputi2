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
    // スタイルがインラインで適用されていることを確認
    expect(card).toHaveAttribute('style');
    expect(card.getAttribute('style')).toContain('background-color');
    expect(card.getAttribute('style')).toContain('border-radius: 12px');
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
    expect(card.getAttribute('style')).toContain('box-shadow: none');

    rerender(
      <TestWrapper>
        <Card elevation={1} data-testid="card-elevation-1">Level 1</Card>
      </TestWrapper>
    );
    card = screen.getByTestId('card-elevation-1');
    expect(card.getAttribute('style')).toContain('box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2)');

    rerender(
      <TestWrapper>
        <Card elevation={2} data-testid="card-elevation-2">Level 2</Card>
      </TestWrapper>
    );
    card = screen.getByTestId('card-elevation-2');
    expect(card.getAttribute('style')).toContain('box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25)');

    rerender(
      <TestWrapper>
        <Card elevation={3} data-testid="card-elevation-3">Level 3</Card>
      </TestWrapper>
    );
    card = screen.getByTestId('card-elevation-3');
    expect(card.getAttribute('style')).toContain('box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3)');

    rerender(
      <TestWrapper>
        <Card elevation={4} data-testid="card-elevation-4">Level 4</Card>
      </TestWrapper>
    );
    card = screen.getByTestId('card-elevation-4');
    expect(card.getAttribute('style')).toContain('box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.35)');
  });

  // Requirement 2.4: hoverableプロパティでホバー時に視覚的フィードバックが表示される
  test('applies hover effects when hoverable is true', () => {
    render(
      <TestWrapper>
        <Card hoverable data-testid="hoverable-card">Hoverable Card</Card>
      </TestWrapper>
    );
    const card = screen.getByTestId('hoverable-card');
    
    expect(card.getAttribute('style')).toContain('background-color: rgb(42, 42, 62)');
    
    fireEvent.mouseEnter(card);
    expect(card.getAttribute('style')).toContain('background-color: rgb(61, 61, 85)');
    
    fireEvent.mouseLeave(card);
    expect(card.getAttribute('style')).toContain('background-color: rgb(42, 42, 62)');
  });

  test('does not apply hover effects when hoverable is false', () => {
    render(
      <TestWrapper>
        <Card hoverable={false} data-testid="non-hoverable-card">Non-hoverable Card</Card>
      </TestWrapper>
    );
    const card = screen.getByTestId('non-hoverable-card');
    
    expect(card.getAttribute('style')).toContain('background-color: rgb(42, 42, 62)');
    
    fireEvent.mouseEnter(card);
    expect(card.getAttribute('style')).toContain('background-color: rgb(42, 42, 62)');
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
    let card = screen.getByTestId('no-padding-card');
    expect(card.getAttribute('style')).toContain('padding: 0px');

    rerender(
      <TestWrapper>
        <Card padding="small" data-testid="small-padding-card">Small Padding</Card>
      </TestWrapper>
    );
    card = screen.getByTestId('small-padding-card');
    expect(card.getAttribute('style')).toContain('padding: 16px');

    rerender(
      <TestWrapper>
        <Card padding="medium" data-testid="medium-padding-card">Medium Padding</Card>
      </TestWrapper>
    );
    card = screen.getByTestId('medium-padding-card');
    expect(card.getAttribute('style')).toContain('padding: 24px');

    rerender(
      <TestWrapper>
        <Card padding="large" data-testid="large-padding-card">Large Padding</Card>
      </TestWrapper>
    );
    card = screen.getByTestId('large-padding-card');
    expect(card.getAttribute('style')).toContain('padding: 32px');
  });

  // Variant test
  test('applies outlined variant styling', () => {
    const { rerender } = render(
      <TestWrapper>
        <Card variant="default" data-testid="default-card">Default Card</Card>
      </TestWrapper>
    );
    let card = screen.getByTestId('default-card');
    // default variant does not include border property in the style attribute
    expect(card.getAttribute('style')).not.toContain('border:');

    rerender(
      <TestWrapper>
        <Card variant="outlined" data-testid="outlined-card">Outlined Card</Card>
      </TestWrapper>
    );
    card = screen.getByTestId('outlined-card');
    expect(card.getAttribute('style')).toContain('border: 1px solid #3d3d55');
  });

  test('applies outlined variant hover styling', () => {
    render(
      <TestWrapper>
        <Card variant="outlined" hoverable data-testid="outlined-hoverable-card">Outlined Hoverable Card</Card>
      </TestWrapper>
    );
    const card = screen.getByTestId('outlined-hoverable-card');
    
    expect(card.getAttribute('style')).toContain('border: 1px solid #3d3d55');
    
    fireEvent.mouseEnter(card);
    expect(card.getAttribute('style')).toContain('border: 1px solid #4caf50');
    
    fireEvent.mouseLeave(card);
    expect(card.getAttribute('style')).toContain('border: 1px solid #3d3d55');
  });

  // Cursor styling test
  test('applies correct cursor styling', () => {
    const { rerender } = render(
      <TestWrapper>
        <Card data-testid="cursor-default-card">Default Card</Card>
      </TestWrapper>
    );
    let card = screen.getByTestId('cursor-default-card');
    expect(card.getAttribute('style')).toContain('cursor: default');

    rerender(
      <TestWrapper>
        <Card hoverable onClick={() => {}} data-testid="cursor-pointer-card">Clickable Card</Card>
      </TestWrapper>
    );
    card = screen.getByTestId('cursor-pointer-card');
    expect(card.getAttribute('style')).toContain('cursor: pointer');
  });

  // Transition styling test
  test('applies transition styling', () => {
    render(
      <TestWrapper>
        <Card data-testid="transition-card">Card with Transition</Card>
      </TestWrapper>
    );
    const card = screen.getByTestId('transition-card');
    
    expect(card.getAttribute('style')).toContain('transition: all 0.2s ease-in-out');
  });
});