import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const NavContainer = styled('nav')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const NavLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  padding: theme.spacing(1, 2),
  textDecoration: 'none',
  color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
  backgroundColor: isActive ? theme.palette.primary.light : 'transparent',
  borderRadius: theme.shape.borderRadius,
  fontWeight: isActive ? 'bold' : 'normal',
  transition: theme.transitions.create(['background-color', 'color']),
  '&:hover': {
    backgroundColor: isActive
      ? theme.palette.primary.light
      : theme.palette.action.hover,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

export const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/main', label: 'メイン' },
    { path: '/account', label: 'アカウント' },
    { path: '/help', label: 'ヘルプ' },
    { path: '/shop', label: 'ショップ' },
    { path: '/settings', label: '設定' },
  ];

  return (
    <NavContainer role="navigation" aria-label="メインナビゲーション">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            isActive={isActive}
            aria-current={isActive ? 'page' : undefined}
            tabIndex={0}
          >
            {item.label}
          </NavLink>
        );
      })}
    </NavContainer>
  );
};