# BubblePop 多言語対応実装方針

## 概要
BubblePopアプリケーションにおける多言語対応の実装方針を定義します。日本語・英語の2言語に対応し、設定に基づいて動的に言語を切り替えます。

## 対応言語
- **ja** (日本語) - デフォルト言語
- **en** (English)

## 翻訳ファイルの配置場所

### ディレクトリ構造
```
packages/bubblepop/src/
├── locales/                    # 翻訳ファイル配置ディレクトリ
│   ├── ja/                     # 日本語翻訳ファイル
│   │   ├── common.json         # 共通翻訳
│   │   ├── pages.json          # ページ別翻訳
│   │   ├── game.json           # ゲーム関連翻訳
│   │   ├── ui.json             # UI要素翻訳
│   │   └── index.ts            # 日本語翻訳のエクスポート
│   ├── en/                     # 英語翻訳ファイル
│   │   ├── common.json         # 共通翻訳
│   │   ├── pages.json          # ページ別翻訳
│   │   ├── game.json           # ゲーム関連翻訳
│   │   ├── ui.json             # UI要素翻訳
│   │   └── index.ts            # 英語翻訳のエクスポート
│   └── index.ts                # 翻訳システムのメインエクスポート
```

### 翻訳ファイルの配置ルール
- 各言語は独立したディレクトリに配置
- 機能別に翻訳ファイルを分割
- 各言語ディレクトリ内のファイル構成は同一

## 翻訳ファイルの命名規則

### ファイル名規則
- **言語コード**: `ja` (日本語), `en` (英語)
- **ファイル名**: `{機能名}.json`
- **拡張子**: `.json` (JSON形式)

### 翻訳キー命名規則
```json
{
  "common": {
    "title": "BubblePop",
    "start": "ゲーム開始",
    "settings": "設定"
  },
  "pages": {
    "title": {
      "subtitle": "タップして泡を割ろう！",
      "startButton": "GAME START"
    },
    "main": {
      "welcome": "ようこそ、{username}さん",
      "level": "レベル {level}"
    }
  }
}
```

### キー構造規則
- **階層構造**: ドット記法で階層を表現
- **プレースホルダー**: `{変数名}` 形式で動的値を挿入
- **命名**: 機能名.要素名.項目名 の形式

## 翻訳実装の仕組み

### 使用ライブラリ
- **react-i18next**: React用i18nライブラリ
- **i18next**: コア翻訳ライブラリ

### 翻訳システムの初期化
```typescript
// src/locales/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import jaTranslations from './ja';
import enTranslations from './en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ja: { translation: jaTranslations },
      en: { translation: enTranslations }
    },
    lng: 'ja', // デフォルト言語
    fallbackLng: 'ja',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
```

### 翻訳キーの管理方法
```typescript
// 翻訳キーの型定義
interface TranslationKeys {
  common: {
    title: string;
    start: string;
    settings: string;
  };
  pages: {
    title: {
      subtitle: string;
      startButton: string;
    };
    main: {
      welcome: string;
      level: string;
    };
  };
}

// 翻訳キーの使用例
const { t } = useTranslation();
const title = t('common.title');
const welcome = t('pages.main.welcome', { username: 'プレイヤー1' });
```

## 翻訳の動的読み込み

### 言語切り替えの実装
```typescript
// 言語切り替え関数
const changeLanguage = (language: 'ja' | 'en') => {
  i18n.changeLanguage(language);
  // 設定ストアに保存
  useSettingsStore.getState().updateLanguage(language);
};

// 設定からの言語読み込み
const loadLanguageFromSettings = () => {
  const settings = useSettingsStore.getState();
  i18n.changeLanguage(settings.language);
};
```

### 設定との連携
- **SettingsStore**の`language`設定と連動
- 設定変更時に即座に翻訳を切り替え
- アプリケーション起動時に設定から言語を復元

### ブラウザ言語の自動検出
```typescript
// ブラウザ言語の検出と設定
const detectBrowserLanguage = (): 'ja' | 'en' => {
  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'en' ? 'en' : 'ja';
};

// 初期設定時の言語決定
const initializeLanguage = () => {
  const settings = useSettingsStore.getState();
  if (!settings.language) {
    const detectedLang = detectBrowserLanguage();
    useSettingsStore.getState().updateLanguage(detectedLang);
  }
  loadLanguageFromSettings();
};
```

## 翻訳ファイルの構造例

### common.json (共通翻訳)
```json
{
  "title": "BubblePop",
  "start": "ゲーム開始",
  "settings": "設定",
  "help": "ヘルプ",
  "account": "アカウント",
  "shop": "ショップ",
  "back": "戻る",
  "close": "閉じる",
  "save": "保存",
  "cancel": "キャンセル",
  "confirm": "確認"
}
```

### pages.json (ページ別翻訳)
```json
{
  "title": {
    "subtitle": "タップして泡を割ろう！",
    "startButton": "GAME START",
    "version": "Version 1.0.0"
  },
  "main": {
    "welcome": "ようこそ、{username}さん",
    "level": "レベル {level}",
    "ap": "AP: {ap}",
    "tap": "TAP: {tap}"
  },
  "game": {
    "score": "スコア: {score}",
    "combo": "コンボ: {combo}",
    "time": "残り時間: {time}",
    "hp": "HP: {hp}/{maxHp}",
    "giveUp": "ギブアップ"
  }
}
```

### game.json (ゲーム関連翻訳)
```json
{
  "bubbles": {
    "normal": "通常泡",
    "stone": "石泡",
    "iron": "鉄泡",
    "diamond": "ダイヤモンド泡",
    "rainbow": "虹色泡",
    "pink": "回復泡",
    "poison": "毒泡"
  },
  "effects": {
    "bonusTime": "ボーナスタイム",
    "timeStop": "時間停止",
    "scoreMultiplier": "スコア倍率"
  }
}
```

### ui.json (UI要素翻訳)
```json
{
  "buttons": {
    "gameStart": "ゲーム開始",
    "playAgain": "もう一度プレイ",
    "menuReturn": "メニューに戻る",
    "purchase": "購入",
    "reset": "リセット"
  },
  "labels": {
    "username": "ユーザー名",
    "level": "レベル",
    "score": "スコア",
    "time": "時間"
  }
}
```

## 実装時の注意事項

### 1. 翻訳キーの一貫性
- 同じ意味のテキストは同じ翻訳キーを使用
- 翻訳キーの命名規則を統一
- 各言語ファイルで同じキー構造を維持

### 2. 動的値の処理
- プレースホルダー `{変数名}` を使用
- 数値のフォーマットは各言語に適した形式
- 日時の表示形式も言語に応じて調整

### 3. 設定との同期
- 言語設定変更時に即座に翻訳を更新
- 設定の永続化と翻訳の復元
- ブラウザ言語の自動検出機能

### 4. パフォーマンス
- 翻訳ファイルは必要時のみ読み込み
- メモリ使用量の最適化
- 翻訳キーのキャッシュ機能

この実装方針により、BubblePopアプリケーションの多言語対応を効率的に実現します。
