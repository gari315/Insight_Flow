/**
 * メインAppコンポーネント
 */
import { useNewsData } from './hooks/useNewsData';
import Header from './components/Header';
import NewsGrid from './components/NewsGrid';
import ImpactPanel from './components/ImpactPanel';
import LoadingState from './components/LoadingState';

function App() {
  const { newsData, impactAnalysis, loading, error, lastUpdate, refresh } = useNewsData();

  return (
    <div className="min-h-screen bg-app-bg text-gray-100">
      {/* ヘッダー */}
      <Header 
        lastUpdate={lastUpdate}
        onRefresh={refresh}
        isLoading={loading}
      />

      {/* メインコンテンツ */}
      <main>
        {/* エラー表示 */}
        {error && (
          <div className="max-w-[1400px] mx-auto px-6 py-8">
            <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-red-400 font-semibold">エラーが発生しました</h3>
                  <p className="text-red-300 text-sm mt-1">{error}</p>
                </div>
              </div>
              <button
                onClick={refresh}
                className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
              >
                再試行
              </button>
            </div>
          </div>
        )}

        {/* ローディング状態 */}
        {loading && !error && (
          <LoadingState />
        )}

        {/* ニュースグリッド */}
        {!loading && !error && (
          <>
            <NewsGrid newsData={newsData} />
            
            {/* 日本への影響パネル */}
            <ImpactPanel analysis={impactAnalysis} />
          </>
        )}
      </main>

      {/* フッター */}
      <footer className="border-t border-gray-800 py-6 mt-12">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            次回更新: 「更新」ボタンをクリックしてください
          </p>
          <p className="text-gray-600 text-xs mt-2">
            AI News Curator © 2026 | Powered by Genspark
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
