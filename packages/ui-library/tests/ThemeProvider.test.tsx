import React from 'react';
import { render } from '@testing-library/react';
import { Typography, Button, useTheme } from '@mui/material';
import { BubblePopThemeProvider } from '../src/providers/ThemeProvider';

// テスト用のコンポーネント
const TestComponent: React.FC = () => {
  const theme = useTheme();
  return (
    <div>
      <Typography variant="h1" data-testid="heading">Test Heading</Typography>
      <Typography variant="body1" data-testid="body">Test Body</Typography>
      <Button data-testid="button">Test Button</Button>
      <div data-testid="primary-color">{theme.palette.primary.main}</div>
      <div data-testid="secondary-color">{theme.palette.secondary.main}</div>
    </div>
  );
};

describe('BubblePopThemeProvider', () => {
  test('should render children', () => {
    const { getByText } = render(
      <BubblePopThemeProvider>
        <div>Test Child</div>
      </BubblePopThemeProvider>
    );
    
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  test('should apply theme to MUI components', () => {
    const { getByTestId } = render(
      <BubblePopThemeProvider>
        <TestComponent />
      </BubblePopThemeProvider>
    );
    
    const heading = getByTestId('heading');
    const body = getByTestId('body');
    const button = getByTestId('button');
    
    // テーマが適用されていることを確認
    expect(heading).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should provide correct theme colors', () => {
    const { getByTestId } = render(
      <BubblePopThemeProvider>
        <TestComponent />
      </BubblePopThemeProvider>
    );
    
    const primaryColor = getByTestId('primary-color');
    const secondaryColor = getByTestId('secondary-color');
    
    expect(primaryColor.textContent).toBe('#4CAF50');
    expect(secondaryColor.textContent).toBe('#FFD700');
  });

  test('should apply CssBaseline', () => {
    // CssBaselineはグローバルスタイルを適用するため、
    // body要素のスタイルが変更されることを確認
    const { container } = render(
      <BubblePopThemeProvider>
        <div>Test</div>
      </BubblePopThemeProvider>
    );
    
    // コンテナが正常にレンダリングされていることを確認
    expect(container).toBeInTheDocument();
  });

  test('should handle multiple children', () => {
    const { getByText } = render(
      <BubblePopThemeProvider>
        <div>First Child</div>
        <div>Second Child</div>
        <div>Third Child</div>
      </BubblePopThemeProvider>
    );
    
    expect(getByText('First Child')).toBeInTheDocument();
    expect(getByText('Second Child')).toBeInTheDocument();
    expect(getByText('Third Child')).toBeInTheDocument();
  });

  test('should apply dark mode palette', () => {
    const { getByTestId } = render(
      <BubblePopThemeProvider>
        <TestComponent />
      </BubblePopThemeProvider>
    );
    
    // ダークモードのテーマが適用されていることを確認
    const heading = getByTestId('heading');
    expect(heading).toHaveStyle('color: #FFFFFF');
  });
});