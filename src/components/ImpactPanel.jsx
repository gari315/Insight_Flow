/**
 * 日本への影響パネルコンポーネント
 */
import { useState } from 'react';

const categoryColors = {
  '経済': 'bg-yellow-500',
  '外交': 'bg-blue-500',
  'テクノロジー': 'bg-purple-500',
  '社会': 'bg-green-500',
  '経済・外交': 'bg-gradient-to-r from-yellow-500 to-blue-500'
};

export default function ImpactPanel({ analysis }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!analysis) return null;

  const categoryColor = categoryColors[analysis.category] || 'bg-gray-500';
  
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <div className="bg-card-bg border border-gray-700 rounded-xl overflow-hidden">
        {/* カラーバー */}
        <div className={`h-1 ${categoryColor}`}></div>
        
        <div className="p-6">
          {/* ヘッダー */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
                <span>🔍</span>
                <span>今日の「日本への影響」考察</span>
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Today's Impact Analysis for Japan
              </p>
            </div>
            
            {/* カテゴリバッジ */}
            <div className="flex items-center space-x-2">
              <span className={`
                ${categoryColor} text-white
                px-3 py-1 rounded-full text-xs font-medium
              `}>
                {analysis.category}
              </span>
            </div>
          </div>

          {/* 考察テキスト */}
          <div className="prose prose-invert max-w-none">
            <p className={`
              text-gray-300 leading-relaxed
              ${!isExpanded ? 'line-clamp-3' : ''}
            `}>
              {analysis.text}
            </p>
          </div>

          {/* タグ */}
          {analysis.tags && analysis.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {analysis.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 展開ボタン */}
          {analysis.text.length > 200 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 text-sm text-accent-blue hover:text-blue-400 transition-colors font-medium"
            >
              {isExpanded ? '▲ 折りたたむ' : '▼ 詳しく見る'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
