import { bubblePopTheme } from '../src/theme';

describe('BubblePop Theme', () => {
  describe('Color Palette', () => {
    test('should have correct primary color', () => {
      expect(bubblePopTheme.palette.primary.main).toBe('#4CAF50');
    });

    test('should have correct secondary color', () => {
      expect(bubblePopTheme.palette.secondary.main).toBe('#FFD700');
    });

    test('should have correct background colors', () => {
      expect(bubblePopTheme.palette.background.default).toBe('#0F0F1E');
      expect(bubblePopTheme.palette.background.paper).toBe('#2A2A3E');
    });

    test('should have correct text colors', () => {
      expect(bubblePopTheme.palette.text.primary).toBe('#FFFFFF');
      expect(bubblePopTheme.palette.text.secondary).toBe('#B0B0C0');
    });

    test('should have correct error, warning, info, and success colors', () => {
      expect(bubblePopTheme.palette.error.main).toBe('#FF6B6B');
      expect(bubblePopTheme.palette.warning.main).toBe('#FF9800');
      expect(bubblePopTheme.palette.info.main).toBe('#4A90E2');
      expect(bubblePopTheme.palette.success.main).toBe('#4CAF50');
    });
  });

  describe('Typography', () => {
    test('should have correct font family', () => {
      expect(bubblePopTheme.typography.fontFamily).toContain('Helvetica');
      expect(bubblePopTheme.typography.fontFamily).toContain('Arial');
      expect(bubblePopTheme.typography.fontFamily).toContain('sans-serif');
    });

    test('should have correct heading sizes', () => {
      expect(bubblePopTheme.typography.h1?.fontSize).toBe('72px');
      expect(bubblePopTheme.typography.h2?.fontSize).toBe('48px');
      expect(bubblePopTheme.typography.h3?.fontSize).toBe('36px');
      expect(bubblePopTheme.typography.h4?.fontSize).toBe('24px');
    });

    test('should have correct body text sizes', () => {
      expect(bubblePopTheme.typography.body1?.fontSize).toBe('16px');
      expect(bubblePopTheme.typography.body2?.fontSize).toBe('14px');
    });

    test('should have correct button size', () => {
      expect(bubblePopTheme.typography.button?.fontSize).toBe('28px');
    });
  });

  describe('Spacing', () => {
    test('should have 8px spacing unit', () => {
      expect(bubblePopTheme.spacing(1)).toBe('8px');
      expect(bubblePopTheme.spacing(2)).toBe('16px');
      expect(bubblePopTheme.spacing(3)).toBe('24px');
      expect(bubblePopTheme.spacing(4)).toBe('32px');
    });
  });

  describe('Shape', () => {
    test('should have correct border radius', () => {
      expect(bubblePopTheme.shape.borderRadius).toBe(8);
    });
  });

  describe('Breakpoints', () => {
    test('should have responsive breakpoints defined', () => {
      expect(bubblePopTheme.breakpoints.values.xs).toBe(0);
      expect(bubblePopTheme.breakpoints.values.sm).toBe(600);
      expect(bubblePopTheme.breakpoints.values.md).toBe(900);
      expect(bubblePopTheme.breakpoints.values.lg).toBe(1200);
      expect(bubblePopTheme.breakpoints.values.xl).toBe(1536);
    });
  });

  describe('Component Overrides', () => {
    test('should have MuiButton customizations', () => {
      const buttonOverrides = bubblePopTheme.components?.MuiButton?.styleOverrides;
      expect(buttonOverrides).toBeDefined();
    });

    test('should have MuiCard customizations', () => {
      const cardOverrides = bubblePopTheme.components?.MuiCard?.styleOverrides;
      expect(cardOverrides).toBeDefined();
    });

    test('should have MuiTypography customizations', () => {
      const typographyOverrides = bubblePopTheme.components?.MuiTypography?.styleOverrides;
      expect(typographyOverrides).toBeDefined();
    });
  });
});