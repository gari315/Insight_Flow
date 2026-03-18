/**
 * ニュースカードコンポーネント
 */
import { useState } from 'react';
import { getRelativeTime } from '../utils/dateUtils';

const categoryConfig = {
  ai: {
    name: 'AI・テクノロジー',
    color: 'border-category-ai',
    bgColor: 'bg-category-ai',
    textColor: 'text-category-ai'
  },
  general: {
    name: '総合ニュース',
    color: 'border-category-general',
    bgColor: 'bg-category-general',
    textColor: 'text-category-general'
  },
  japan: {
    name: '日本・国際',
    color: 'border-category-japan',
    bgColor: 'bg-category-japan',
    textColor: 'text-category-japan'
  }
};

export default function NewsCard({ news, animationDelay = 0 }) {
  const [showEnglishSummary, setShowEnglishSummary] = useState(false);
  const config = categoryConfig[news.category] || categoryConfig.general;

  return (
    <article 
      className={`
        bg-card-bg rounded-xl border ${config.color} border-opacity-30
        p-5 transition-all duration-300
        hover:border-opacity-100 hover:-translate-y-0.5 hover:shadow-lg
        animate-fade-in
      `}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* カテゴリバッジとソース */}
      <div className="flex items-center justify-between mb-3">
        <span className={`
          ${config.bgColor} ${config.textColor} bg-opacity-20
          px-3 py-1 rounded-full text-xs font-medium
        `}>
          {config.name}
        </span>
        
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>{news.source}</span>
          {news.date && (
            <>
              <span>•</span>
              <span>{getRelativeTime(news.date)}</span>
            </>
          )}
        </div>
      </div>

      {/* タイトル */}
      <h3 className="text-lg font-serif font-semibold text-white mb-2 leading-snug">
        {news.title}
      </h3>
      
      {/* 英語タイトル */}
      {news.titleEn && (
        <p className="text-sm text-gray-400 mb-3 italic">
          {news.titleEn}
        </p>
      )}

      {/* 日本語要約 */}
      <div className="mb-4">
        <p className="text-gray-300 text-sm leading-relaxed">
          {news.summaryJa}
        </p>
      </div>

      {/* 英語要約（折りたたみ可能） */}
      {news.summaryEn && (
        <div className="mb-4">
          <button
            onClick={() => setShowEnglishSummary(!showEnglishSummary)}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center space-x-1"
          >
            <span>{showEnglishSummary ? '▼' : '▶'}</span>
            <span>English Summary</span>
          </button>
          
          {showEnglishSummary && (
            <p className="text-gray-400 text-sm leading-relaxed mt-2 pl-4 border-l-2 border-gray-700">
              {news.summaryEn}
            </p>
          )}
        </div>
      )}

      {/* リンクボタン */}
      {news.link ? (
        <a
          href={news.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            inline-flex items-center space-x-2
            ${config.textColor} hover:underline
            text-sm font-medium transition-colors
          `}
        >
          <span>記事を読む</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      ) : (
        <span className="text-gray-600 text-sm italic">URL取得不可</span>
      )}
    </article>
  );
}
