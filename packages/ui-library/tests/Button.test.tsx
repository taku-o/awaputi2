import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@testing-library/jest-dom';
import { Button } from '../src/components/Button';

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
    }
  },
  typography: {
    button: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.2,
      textTransform: 'none' as const
    }
  }
});

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Button Component', () => {
  // Requirement 1.1: MUIテーマに基づいたスタイリングが適用される
  test('applies MUI theme-based styling', () => {
    render(
      <TestWrapper>
        <Button>Test Button</Button>
      </TestWrapper>
    );
    const button = screen.getByRole('button');
    
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle('font-size: 28px');
    expect(button).toHaveStyle('font-weight: 700');
  });

  // Requirement 1.2: primary、secondary、iconの各バリエーションが表示される
  test('renders primary variant correctly', () => {
    render(
      <TestWrapper>
        <Button variant="primary">Primary Button</Button>
      </TestWrapper>
    );
    const button = screen.getByRole('button');
    
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Primary Button')).toBeInTheDocument();
  });

  test('renders secondary variant correctly', () => {
    render(
      <TestWrapper>
        <Button variant="secondary">Secondary Button</Button>
      </TestWrapper>
    );
    const button = screen.getByRole('button');
    
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Secondary Button')).toBeInTheDocument();
  });

  test('renders icon variant correctly', () => {
    render(
      <TestWrapper>
        <Button variant="icon">Icon Button</Button>
      </TestWrapper>
    );
    const button = screen.getByRole('button');
    
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Icon Button')).toBeInTheDocument();
  });

  // Requirement 1.3: disabled状態で適切な視覚的フィードバックが表示される
  test('applies disabled styling and behavior', () => {
    render(
      <TestWrapper>
        <Button disabled>Disabled Button</Button>
      </TestWrapper>
    );
    const button = screen.getByRole('button');
    
    expect(button).toBeDisabled();
    expect(button).toHaveStyle('opacity: 0.6');
    expect(button).toHaveStyle('cursor: not-allowed');
  });

  // Requirement 1.4: onClickハンドラーでクリック時にイベントが発火する
  test('fires onClick event when clicked', () => {
    const handleClick = jest.fn();
    render(
      <TestWrapper>
        <Button onClick={handleClick}>Clickable Button</Button>
      </TestWrapper>
    );
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not fire onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <TestWrapper>
        <Button onClick={handleClick} disabled>Disabled Button</Button>
      </TestWrapper>
    );
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Requirement 1.5: childrenでボタン内にテキストやアイコンが表示される
  test('displays children content', () => {
    render(
      <TestWrapper>
        <Button>Button Text</Button>
      </TestWrapper>
    );
    
    expect(screen.getByText('Button Text')).toBeInTheDocument();
  });

  test('displays start and end icons', () => {
    const StartIcon = (): React.ReactElement => <span data-testid="start-icon">←</span>;
    const EndIcon = (): React.ReactElement => <span data-testid="end-icon">→</span>;
    
    render(
      <TestWrapper>
        <Button startIcon={<StartIcon />} endIcon={<EndIcon />}>
          Button with Icons
        </Button>
      </TestWrapper>
    );
    
    expect(screen.getByText('Button with Icons')).toBeInTheDocument();
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  // Size variants test
  test('renders different sizes correctly', () => {
    const { rerender } = render(
      <TestWrapper>
        <Button size="small">Small Button</Button>
      </TestWrapper>
    );
    let button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Small Button')).toBeInTheDocument();

    rerender(
      <TestWrapper>
        <Button size="medium">Medium Button</Button>
      </TestWrapper>
    );
    button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Medium Button')).toBeInTheDocument();

    rerender(
      <TestWrapper>
        <Button size="large">Large Button</Button>
      </TestWrapper>
    );
    button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Large Button')).toBeInTheDocument();
  });

  // fullWidth test
  test('renders fullWidth button correctly', () => {
    render(
      <TestWrapper>
        <Button fullWidth>Full Width Button</Button>
      </TestWrapper>
    );
    const button = screen.getByRole('button');
    
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Full Width Button')).toBeInTheDocument();
  });
});