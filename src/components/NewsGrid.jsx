/**
 * ニュースグリッドコンポーネント
 */
import NewsCard from './NewsCard';

const columnTitles = {
  ai: {
    icon: '🤖',
    title: 'AI・テクノロジー最前線',
    titleEn: 'AI & Technology'
  },
  general: {
    icon: '📰',
    title: '今日の主要ニュース TOP',
    titleEn: 'Top Stories'
  },
  japan: {
    icon: '🗾',
    title: '日本・国際情勢',
    titleEn: 'Japan & International'
  }
};

function NewsColumn({ category, news, animationStartDelay = 0 }) {
  const config = columnTitles[category];
  
  return (
    <div className="flex flex-col">
      {/* カラムヘッダー */}
      <div className="mb-4">
        <h2 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
          <span>{config.icon}</span>
          <span>{config.title}</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">{config.titleEn}</p>
      </div>
      
      {/* ニュースカード */}
      <div className="space-y-4">
        {news && news.length > 0 ? (
          news.map((item, index) => (
            <NewsCard 
              key={item.id} 
              news={item}
              animationDelay={animationStartDelay + (index * 50)}
            />
          ))
        ) : (
          <div className="bg-card-bg rounded-xl border border-gray-800 p-6 text-center">
            <p className="text-gray-500">ニュースが見つかりませんでした</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function NewsGrid({ newsData }) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      {/* 3カラムグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <NewsColumn 
          category="ai" 
          news={newsData.ai}
          animationStartDelay={0}
        />
        <NewsColumn 
          category="general" 
          news={newsData.general}
          animationStartDelay={150}
        />
        <NewsColumn 
          category="japan" 
          news={newsData.japan}
          animationStartDelay={300}
        />
      </div>
    </div>
  );
}
