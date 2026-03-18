/**
 * ヘッダーコンポーネント
 */
import { getCurrentDate } from '../utils/dateUtils';

export default function Header({ lastUpdate, onRefresh, isLoading }) {
  const formatUpdateTime = (date) => {
    if (!date) return '--:--';
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <header className="bg-card-bg border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 左側: タイトルと日付 */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-serif font-bold text-white">
              📰 AI News Curator
            </h1>
            <span className="text-gray-400 text-sm hidden md:inline">
              {getCurrentDate()}
            </span>
          </div>
          
          {/* 右側: 更新情報とボタン */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-500">最終更新</p>
              <p className="text-sm text-gray-300 font-mono">
                {formatUpdateTime(lastUpdate)} JST
              </p>
            </div>
            
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm
                transition-all duration-200
                ${isLoading 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-accent-blue text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/50'
                }
              `}
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                      fill="none"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>更新中</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>更新</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
