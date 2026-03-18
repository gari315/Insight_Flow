# AI News Curator

毎日のAI技術・総合ニュース・日本動向を自動収集し、バイリンガル（日英）で表示するニュースダッシュボード。

## 特徴

- 📰 **3カテゴリのニュース収集**
  - AI・テクノロジー最前線
  - 今日の主要ニュース TOP
  - 日本・国際情勢

- 🌐 **バイリンガル対応**
  - 日本語要約と英語サマリーを両方表示
  - 国際ニュースも日本語で理解できる

- 🎨 **洗練されたダークモードUI**
  - 知的で高品質な情報紙のようなデザイン
  - カテゴリ別のカラーコーディング
  - スムーズなアニメーション

- 🔄 **リアルタイム更新**
  - ワンクリックで最新ニュースを取得
  - 最終更新時刻を表示

- 🔍 **日本への影響分析**
  - 当日のニュースを総合的に分析
  - 経済・外交・テクノロジーへの影響を考察

## 技術スタック

- **フレームワーク**: React 19 + Vite 8
- **スタイリング**: Tailwind CSS 4
- **フォント**: Noto Sans JP, Noto Serif JP
- **デプロイ**: GitHub Pages / Vercel 対応

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# ビルドのプレビュー
npm run preview
```

## プロジェクト構造

```
webapp/
├── src/
│   ├── components/       # UIコンポーネント
│   │   ├── Header.jsx
│   │   ├── NewsGrid.jsx
│   │   ├── NewsCard.jsx
│   │   ├── ImpactPanel.jsx
│   │   └── LoadingState.jsx
│   ├── hooks/            # カスタムフック
│   │   └── useNewsData.js
│   ├── services/         # データ取得サービス
│   │   └── searchService.js
│   ├── utils/            # ユーティリティ
│   │   ├── dateUtils.js
│   │   └── newsParser.js
│   ├── App.jsx           # メインコンポーネント
│   ├── main.jsx          # エントリーポイント
│   └── index.css         # グローバルスタイル
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 機能

### 現在実装済み
- ✅ 3カラムニュースグリッド（レスポンシブ対応）
- ✅ ニュースカードUI（カテゴリバッジ、ソース、日時）
- ✅ バイリンガル表示（日本語要約 + 英語サマリー）
- ✅ 日本への影響分析パネル
- ✅ 手動更新機能
- ✅ ローディング状態とエラーハンドリング
- ✅ アニメーション効果

### 今後の拡張予定
- 🔄 実際のWeb検索API統合
- 🤖 LLMによる要約生成
- 📊 ニュースのトレンド分析
- 🔔 通知機能
- 💾 お気に入り保存機能

## 開発モード

現在はモックデータで動作しています。実際のニュース取得には、バックエンドAPIの統合が必要です。

`src/services/searchService.js` の `fetchNews()` 関数で `useMock` パラメータを `false` に変更することで、実際のAPI呼び出しに切り替えられます。

## レスポンシブ対応

| 画面幅 | レイアウト |
|---|---|
| 1200px以上 | 3カラム |
| 768px〜1199px | 2カラム |
| 767px以下 | 1カラム（スタック表示） |

## ライセンス

MIT License

## 作成者

Powered by Genspark AI
