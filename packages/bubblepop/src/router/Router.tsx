import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 一時的な仮ページコンポーネント（タスク3で正式実装予定）
const TitlePage = () => <div>タイトル画面</div>;
const MainPage = () => <div>メイン画面</div>;
const GamePage = () => <div>ゲームプレイ画面</div>;
const ResultPage = () => <div>プレイ結果画面</div>;
const AccountPage = () => <div>アカウント情報画面</div>;
const HelpPage = () => <div>ヘルプ画面</div>;
const HelpDetailPage = () => <div>ヘルプ詳細画面</div>;
const ShopPage = () => <div>ショップ画面</div>;
const ItemDetailPage = () => <div>アイテム詳細画面</div>;
const SettingsPage = () => <div>設定画面</div>;
const NotFoundPage = () => <div>404 - ページが見つかりません</div>;

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};