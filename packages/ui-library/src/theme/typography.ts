import { TypographyOptions } from '@mui/material/styles/createTypography';

export const typography: TypographyOptions = {
  fontFamily: 'Helvetica, Arial, sans-serif',
  h1: {
    fontSize: '72px',
    fontWeight: 900,
    lineHeight: 1.2,
    color: '#FFFFFF'
  },
  h2: {
    fontSize: '48px',
    fontWeight: 700,
    lineHeight: 1.2,
    color: '#FFFFFF'
  },
  h3: {
    fontSize: '36px',
    fontWeight: 700,
    lineHeight: 1.2,
    color: '#FFFFFF'
  },
  h4: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: 1.3,
    color: '#FFFFFF'
  },
  body1: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#FFFFFF'
  },
  body2: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#B0B0C0'
  },
  button: {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: 1.2,
    textTransform: 'none' as const
  },
  caption: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.4,
    color: '#888888'
  }
};