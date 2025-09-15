import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DebugGameTopPage } from '../pages/DebugGameTopPage';
import { GamePage } from '../pages/GamePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DebugGameTopPage />,
  },
  {
    path: '/game',
    element: <GamePage />,
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};