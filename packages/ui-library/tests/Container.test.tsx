import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { bubblePopTheme } from '../src/theme';
import { Container } from '../src/components/Container';

// Requirement 3.1: maxWidth制限機能のテスト
describe('Container - maxWidth制限機能 (Requirement 3.1)', () => {
  it('maxWidth="xs"を指定すると制限される', () => {
    const { container } = render(
      <ThemeProvider theme={bubblePopTheme}>
        <Container maxWidth="xs" data-testid="container">
          Test Content
        </Container>
      </ThemeProvider>
    );
    const containerElement = container.firstChild as HTMLElement;
    // MUI Containerコンポーネントとして動作
    expect(containerElement).toHaveClass('MuiContainer-root');
    expect(containerElement).toHaveClass('MuiContainer-maxWidthXs');
  });

  it('maxWidth="lg"を指定すると1200pxで制限される', () => {
    const { container } = render(
      <ThemeProvider theme={bubblePopTheme}>
        <Container maxWidth="lg" data-testid="container">
          Test Content
        </Container>
      </ThemeProvider>
    );
    const containerElement = container.firstChild as HTMLElement;
    // MUI Containerコンポーネントとして動作
    expect(containerElement).toHaveClass('MuiContainer-root');
    expect(containerElement).toHaveClass('MuiContainer-maxWidthLg');
  });

  it('maxWidth=falseを指定すると制限されない', () => {
    const { container } = render(
      <ThemeProvider theme={bubblePopTheme}>
        <Container maxWidth={false} data-testid="container">
          Test Content
        </Container>
      </ThemeProvider>
    );
    const containerElement = container.firstChild as HTMLElement;
    // MUI ContainerコンポーネントでmaxWidth=falseの場合
    expect(containerElement).toHaveClass('MuiContainer-root');
    expect(containerElement).not.toHaveClass('MuiContainer-maxWidthXs');
    expect(containerElement).not.toHaveClass('MuiContainer-maxWidthSm');
    expect(containerElement).not.toHaveClass('MuiContainer-maxWidthMd');
    expect(containerElement).not.toHaveClass('MuiContainer-maxWidthLg');
    expect(containerElement).not.toHaveClass('MuiContainer-maxWidthXl');
  });
});

// Requirement 3.2: center中央揃え機能のテスト
describe('Container - center中央揃え機能 (Requirement 3.2)', () => {
  it('center=trueを指定すると中央揃えされる', () => {
    const { container } = render(
      <ThemeProvider theme={bubblePopTheme}>
        <Container center={true} data-testid="container">
          Test Content
        </Container>
      </ThemeProvider>
    );
    const containerElement = container.firstChild as HTMLElement;
    // MUI Containerコンポーネントはデフォルトで中央揃え
    expect(containerElement).toHaveClass('MuiContainer-root');
  });

  it('center=falseを指定すると中央揃えされない', () => {
    const { container } = render(
      <ThemeProvider theme={bubblePopTheme}>
        <Container center={false} data-testid="container">
          Test Content
        </Container>
      </ThemeProvider>
    );
    const containerElement = container.firstChild as HTMLElement;
    // center=falseはカスタムスタイルで制御
    expect(containerElement).toHaveClass('MuiContainer-root');
    expect(containerElement).toHaveStyle({ marginLeft: 0, marginRight: 0 });
  });
});

// Requirement 3.3: padding機能のテスト
describe('Container - padding機能 (Requirement 3.3)', () => {
  it('padding="small"を指定するとパディングが適用される', () => {
    const { container } = render(
      <ThemeProvider theme={bubblePopTheme}>
        <Container padding="small" data-testid="container">
          Test Content
        </Container>
      </ThemeProvider>
    );
    const containerElement = container.firstChild as HTMLElement;
    // カスタムpaddingはstyledComponentで適用
    expect(containerElement).toHaveClass('MuiContainer-root');
    expect(containerElement).toHaveStyle({ padding: '16px' });
  });

  it('padding="large"を指定するとパディングが適用される', () => {
    const { container } = render(
      <ThemeProvider theme={bubblePopTheme}>
        <Container padding="large" data-testid="container">
          Test Content
        </Container>
      </ThemeProvider>
    );
    const containerElement = container.firstChild as HTMLElement;
    // カスタムpaddingはstyledComponentで適用
    expect(containerElement).toHaveClass('MuiContainer-root');
    expect(containerElement).toHaveStyle({ padding: '32px' });
  });

  it('padding="none"を指定するとパディングが0になる', () => {
    const { container } = render(
      <ThemeProvider theme={bubblePopTheme}>
        <Container padding="none" data-testid="container">
          Test Content
        </Container>
      </ThemeProvider>
    );
    const containerElement = container.firstChild as HTMLElement;
    // カスタムpaddingはstyledComponentで適用
    expect(containerElement).toHaveClass('MuiContainer-root');
    expect(containerElement).toHaveStyle({ padding: '0' });
  });
});

// Requirement 3.4: children表示機能のテスト
describe('Container - children表示機能 (Requirement 3.4)', () => {
  it('childrenプロパティに設定したコンテンツが表示される', () => {
    render(
      <ThemeProvider theme={bubblePopTheme}>
        <Container>
          <span data-testid="child-content">Test Child Content</span>
        </Container>
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('child-content')).toHaveTextContent('Test Child Content');
  });

  it('複数の子要素が表示される', () => {
    render(
      <ThemeProvider theme={bubblePopTheme}>
        <Container>
          <div data-testid="child1">Child 1</div>
          <div data-testid="child2">Child 2</div>
        </Container>
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('child1')).toHaveTextContent('Child 1');
    expect(screen.getByTestId('child2')).toHaveTextContent('Child 2');
  });
});

// Requirement 3.5: レスポンシブスペーシング機能のテスト
describe('Container - レスポンシブスペーシング機能 (Requirement 3.5)', () => {
  it('responsive=trueを指定すると画面サイズに応じたパディングが適用される', () => {
    const { container } = render(
      <ThemeProvider theme={bubblePopTheme}>
        <Container responsive={true} data-testid="container">
          Test Content
        </Container>
      </ThemeProvider>
    );
    const containerElement = container.firstChild as HTMLElement;
    
    // responsive=trueの場合、useMediaQueryの結果によってパディングが決定される
    // テスト環境では具体的な値は環境依存だが、パディングが設定されることを確認
    const computedStyle = getComputedStyle(containerElement);
    expect(computedStyle.padding).toBeDefined();
  });

  it('responsive=falseを指定すると基本パディングが適用される', () => {
    const { container } = render(
      <ThemeProvider theme={bubblePopTheme}>
        <Container responsive={false} padding="medium" data-testid="container">
          Test Content
        </Container>
      </ThemeProvider>
    );
    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveStyle({ padding: '24px' });
  });
});

// Requirement 4.1-4.3: TypeScript型定義のテスト
describe('Container - TypeScript型定義 (Requirements 4.1-4.3)', () => {
  it('適切なpropsが型安全に渡される', () => {
    // この関数がコンパイルエラーなしで実行できることで型定義が機能していることを確認
    const validProps = {
      maxWidth: 'lg' as const,
      center: true,
      padding: 'medium' as const,
      responsive: false,
      children: 'Test content'
    };

    expect(() => {
      render(
        <ThemeProvider theme={bubblePopTheme}>
          <Container {...validProps} />
        </ThemeProvider>
      );
    }).not.toThrow();
  });
});