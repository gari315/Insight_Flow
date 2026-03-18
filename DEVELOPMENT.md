# 開発ガイド

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build
```

## 開発モード

現在はモックデータで動作しています。`src/services/searchService.js` の `fetchAllNews()` 関数で実データに切り替えることができます。

### モックデータの編集

`src/services/searchService.js` の `generateMockNews()` 関数内でモックデータを編集できます。

## コンポーネント構成

### コアコンポーネント
- `Header.jsx`: ヘッダー（タイトル、更新ボタン）
- `NewsGrid.jsx`: 3カラムグリッドレイアウト
- `NewsCard.jsx`: 個別ニュースカード
- `ImpactPanel.jsx`: 日本への影響パネル
- `LoadingState.jsx`: ローディング表示

### カスタムフック
- `useNewsData.js`: ニュースデータ取得と状態管理

### サービス
- `searchService.js`: ニュース検索・取得ロジック

### ユーティリティ
- `dateUtils.js`: 日付フォーマット
- `newsParser.js`: 検索結果のパース・整形

## スタイリング

Tailwind CSS 4を使用しています。カスタムカラーは `tailwind.config.js` で定義されています。

```javascript
colors: {
  'app-bg': '#0f1117',
  'card-bg': '#1a1d27',
  'accent-blue': '#4f8ef7',
  'category-ai': '#4f8ef7',
  'category-general': '#6b7280',
  'category-japan': '#10b981',
}
```

## API統合

実際のニュース取得を実装する場合は、以下の手順で進めてください：

1. **バックエンドAPIの作成**
   - `/api/search` エンドポイントを実装
   - クエリパラメータで検索を実行
   - 検索結果を標準化されたフォーマットで返却

2. **searchService.jsの修正**
   - `fetchNews()` 関数内の `useMock` パラメータを `false` に変更
   - 必要に応じてAPIエンドポイントURLを調整

3. **要約生成の実装**
   - LLM APIを使用して日本語要約と英語サマリーを生成
   - `newsParser.js` の `generateSummary()` 関数を拡張

## デプロイ

### GitHub Pages
```bash
npm run build
# distフォルダをGitHub Pagesにデプロイ
```

### Vercel
```bash
# Vercel CLIを使用
vercel --prod
```

## トラブルシューティング

### Tailwind CSSが適用されない
- `postcss.config.js` と `tailwind.config.js` が正しく設定されているか確認
- `src/index.css` に `@tailwind` ディレクティブが含まれているか確認

### モックデータが表示されない
- ブラウザの開発者ツールでコンソールエラーを確認
- `useNewsData.js` のローディング状態を確認

### レスポンシブレイアウトが崩れる
- ブレークポイント設定を確認（768px, 1200px）
- グリッドクラス（`grid-cols-*`）が正しく適用されているか確認
