import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
    <nav>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={location.pathname === item.path ? 'active' : ''}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};