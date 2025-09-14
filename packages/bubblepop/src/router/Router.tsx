import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TitlePage } from '../pages/TitlePage';
import { MainPage } from '../pages/MainPage';
import { GamePage } from '../pages/GamePage';
import { ResultPage } from '../pages/ResultPage';
import { AccountPage } from '../pages/AccountPage';
import { HelpPage } from '../pages/HelpPage';
import { HelpDetailPage } from '../pages/HelpDetailPage';
import { ShopPage } from '../pages/ShopPage';
import { ItemDetailPage } from '../pages/ItemDetailPage';
import { SettingsPage } from '../pages/SettingsPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { RouterErrorBoundary } from '../components/RouterErrorBoundary';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <RouterErrorBoundary>
        <Routes>
          <Route path="/" element={<TitlePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/game/:stageId" element={<GamePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/help/:category/:topic" element={<HelpDetailPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:itemId" element={<ItemDetailPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </RouterErrorBoundary>
    </BrowserRouter>
  );
};