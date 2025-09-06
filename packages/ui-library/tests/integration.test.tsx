import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button, Card, Typography, Box, Paper } from '@mui/material';
import { BubblePopThemeProvider } from '../src/providers/ThemeProvider';
import { bubblePopTheme } from '../src/theme';

// 統合テスト用のサンプルコンポーネント
const SampleGameUI: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1" gutterBottom>
        BubblePop Game
      </Typography>
      
      <Card sx={{ mb: 2, p: 2 }}>
        <Typography variant="h3">Score</Typography>
        <Typography variant="body1">12,345</Typography>
      </Card>
      
      <Paper sx={{ p: 2, mb: 2, backgroundColor: 'background.paper' }}>
        <Typography variant="h4">Level 5</Typography>
        <Typography variant="body2">Keep popping those bubbles!</Typography>
      </Paper>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary">
          Start Game
        </Button>
        <Button variant="contained" color="secondary">
          Settings
        </Button>
      </Box>
    </Box>
  );
};

describe('Theme Integration', () => {
  test('should apply consistent styling across all components', () => {
    const { container } = render(
      <BubblePopThemeProvider>
        <SampleGameUI />
      </BubblePopThemeProvider>
    );
    
    // 各コンポーネントが存在することを確認
    expect(screen.getByText('BubblePop Game')).toBeInTheDocument();
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('12,345')).toBeInTheDocument();
    expect(screen.getByText('Level 5')).toBeInTheDocument();
    expect(screen.getByText('Start Game')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    
    // MuiCardコンポーネントが存在することを確認
    const cards = container.querySelectorAll('.MuiCard-root');
    expect(cards.length).toBeGreaterThan(0);
    
    // MuiButtonコンポーネントが存在することを確認
    const buttons = container.querySelectorAll('.MuiButton-root');
    expect(buttons.length).toBe(2);
  });

  test('should apply dark theme background colors', () => {
    const { container } = render(
      <BubblePopThemeProvider>
        <Paper data-testid="test-paper">
          <Typography>Dark Theme Test</Typography>
        </Paper>
      </BubblePopThemeProvider>
    );
    
    const paper = screen.getByTestId('test-paper');
    // ダークテーマの背景色が適用されていることを確認
    expect(paper).toHaveStyle('background-color: #2A2A3E');
  });

  test('should apply custom button styles', () => {
    const { container } = render(
      <BubblePopThemeProvider>
        <Button variant="contained" color="primary">
          Custom Button
        </Button>
      </BubblePopThemeProvider>
    );
    
    const button = screen.getByText('Custom Button');
    // カスタムボタンスタイルが適用されていることを確認
    expect(button).toHaveStyle('border-radius: 50px');
    expect(button).toHaveStyle('font-size: 28px');
    expect(button).toHaveStyle('font-weight: 700');
  });

  test('should handle nested components with theme', () => {
    const NestedComponent: React.FC = () => (
      <Card>
        <Box sx={{ p: 2 }}>
          <Typography variant="h2">Nested Title</Typography>
          <Card sx={{ mt: 2 }}>
            <Typography variant="body1">Deeply nested content</Typography>
          </Card>
        </Box>
      </Card>
    );
    
    const { container } = render(
      <BubblePopThemeProvider>
        <NestedComponent />
      </BubblePopThemeProvider>
    );
    
    expect(screen.getByText('Nested Title')).toBeInTheDocument();
    expect(screen.getByText('Deeply nested content')).toBeInTheDocument();
    
    // ネストされたCardコンポーネントが正しくレンダリングされることを確認
    const cards = container.querySelectorAll('.MuiCard-root');
    expect(cards.length).toBe(2);
  });

  test('should apply typography variants correctly', () => {
    render(
      <BubblePopThemeProvider>
        <div>
          <Typography variant="h1" data-testid="h1">Heading 1</Typography>
          <Typography variant="h2" data-testid="h2">Heading 2</Typography>
          <Typography variant="h3" data-testid="h3">Heading 3</Typography>
          <Typography variant="h4" data-testid="h4">Heading 4</Typography>
          <Typography variant="body1" data-testid="body1">Body 1</Typography>
          <Typography variant="body2" data-testid="body2">Body 2</Typography>
          <Typography variant="button" data-testid="button-text">Button</Typography>
        </div>
      </BubblePopThemeProvider>
    );
    
    // 各バリアントが正しいフォントサイズを持つことを確認
    expect(screen.getByTestId('h1')).toHaveStyle('font-size: 72px');
    expect(screen.getByTestId('h2')).toHaveStyle('font-size: 48px');
    expect(screen.getByTestId('h3')).toHaveStyle('font-size: 36px');
    expect(screen.getByTestId('h4')).toHaveStyle('font-size: 24px');
    expect(screen.getByTestId('body1')).toHaveStyle('font-size: 16px');
    expect(screen.getByTestId('body2')).toHaveStyle('font-size: 14px');
    expect(screen.getByTestId('button-text')).toHaveStyle('font-size: 28px');
  });

  test('should apply spacing system correctly', () => {
    render(
      <BubblePopThemeProvider>
        <Box
          data-testid="spacing-box"
          sx={{
            p: 1,  // 8px
            m: 2,  // 16px
            mt: 3, // 24px
            mb: 4, // 32px
          }}
        >
          Spacing Test
        </Box>
      </BubblePopThemeProvider>
    );
    
    const box = screen.getByTestId('spacing-box');
    expect(box).toHaveStyle('padding: 8px');
    expect(box).toHaveStyle('margin: 16px');
    expect(box).toHaveStyle('margin-top: 24px');
    expect(box).toHaveStyle('margin-bottom: 32px');
  });

  test('should integrate with MUI sx prop', () => {
    render(
      <BubblePopThemeProvider>
        <Box
          data-testid="sx-box"
          sx={{
            backgroundColor: 'primary.main',
            color: 'text.primary',
            borderRadius: 1,
            p: 2,
          }}
        >
          SX Prop Test
        </Box>
      </BubblePopThemeProvider>
    );
    
    const box = screen.getByTestId('sx-box');
    expect(box).toHaveStyle('background-color: #4CAF50');
    expect(box).toHaveStyle('color: #FFFFFF');
    expect(box).toHaveStyle('border-radius: 8px');
    expect(box).toHaveStyle('padding: 16px');
  });
});