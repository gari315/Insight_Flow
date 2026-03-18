/**
 * ニュース検索サービス
 * Note: このファイルはフロントエンド用のモックです。
 * 実際のバックエンドAPIエンドポイントに接続する必要があります。
 */

import { getSearchDateString, getJapaneseDateString } from '../utils/dateUtils';
import { parseSearchResult, deduplicateNews, filterByFreshness, limitNewsItems } from '../utils/newsParser';

const CATEGORIES = {
  AI: 'ai',
  GENERAL: 'general',
  JAPAN: 'japan'
};

/**
 * カテゴリごとの検索クエリ設定
 */
const getSearchQueries = () => {
  const dateEn = getSearchDateString(); // YYYY-MM-DD
  const dateJa = getJapaneseDateString(); // YYYY年MM月DD日
  
  return {
    [CATEGORIES.AI]: [
      `AI artificial intelligence breakthrough ${dateEn}`,
      `generative AI LLM news today ${dateEn}`,
      `生成AI 最新ニュース ${dateJa}`
    ],
    [CATEGORIES.GENERAL]: [
      `world news top stories ${dateEn}`,
      `breaking news today ${dateEn}`,
      `今日の主要ニュース ${dateJa}`
    ],
    [CATEGORIES.JAPAN]: [
      `Japan politics economy diplomacy ${dateEn}`,
      `日本 外交 経済 国内 ${dateJa}`,
      `Japan international relations today ${dateEn}`
    ]
  };
};

/**
 * モックデータ生成（開発用）
 */
function generateMockNews(category, count = 5) {
  const mockData = {
    ai: [
      {
        title: '楽天がAI 3.0を発表、日本最大規模のLLM推進を開始',
        titleEn: 'Rakuten AI 3.0 Powers Japan\'s Largest LLM Push',
        link: 'https://www.opensourceforu.com/2026/03/rakuten-ai-3-0-powers-japans-largest-llm-push/',
        source: 'OpenSourceForU',
        date: '4 hours ago',
        snippet: 'Rakuten open sources its largest Japanese LLM to accelerate local AI innovation, reduce reliance on global models, and enable enterprises to build Japanese language AI infrastructure.',
        summaryJa: '楽天が日本最大規模の大規模言語モデル（LLM）をオープンソース化し、地域AI革新の加速、グローバルモデルへの依存削減、企業向け日本語AI基盤の構築を目指す。',
        summaryEn: 'Rakuten open sources its largest Japanese LLM to accelerate local AI innovation, reduce reliance on global models, and enable enterprises.'
      },
      {
        title: 'エヌビディア、中国向けチップ生産を"再始動"',
        titleEn: 'Nvidia "Firing Up" Chip Production for China',
        link: 'https://www.youtube.com/watch?v=IxpMt7TbI9s',
        source: 'YouTube',
        date: '3 hours ago',
        snippet: 'Nvidia is ramping up chip production for the Chinese market amid intensifying AI demand and global competition.',
        summaryJa: 'エヌビディアが中国市場向けの半導体生産を本格化する動きが報じられた。AI需要の高まりとグローバル市場での競争激化を背景に、中国向けチップの供給体制を強化する方針。',
        summaryEn: 'Nvidia is ramping up chip production for the Chinese market amid intensifying AI demand and global competition.'
      },
      {
        title: 'モルガン・スタンレー、2026年前半にAI大変革が到来と警告',
        titleEn: 'Morgan Stanley warns an AI breakthrough Is coming in 2026',
        link: 'https://fortune.com/2026/03/13/elon-musk-morgan-stanley-ai-leap-2026/',
        source: 'Fortune',
        date: '5 days ago',
        snippet: 'Morgan Stanley analysts predict a transformative AI breakthrough in 2026 that could have far-reaching implications for power infrastructure.',
        summaryJa: 'モルガン・スタンレーのアナリストは、2026年前半に大規模なAI技術革新が到来すると予測し、電力インフラなど既存システムへの大きな影響を警告。',
        summaryEn: 'Morgan Stanley analysts predict a transformative AI breakthrough in 2026 with implications for power infrastructure.'
      }
    ],
    general: [
      {
        title: '米・イスラエルによるイラン攻撃が激化、中東情勢緊迫化',
        titleEn: 'Iran War Live Updates: Israel Escalates Attacks',
        link: 'https://www.nytimes.com/live/2026/03/18/world/iran-war-news-trump-oil',
        source: 'NYTimes',
        date: '2 hours ago',
        snippet: 'US-Israel military operations against Iran continue with escalating attacks, resulting in over 1,444 deaths in Iran and retaliatory strikes.',
        summaryJa: '米国とイスラエルによるイラン攻撃が続く中、イランが反撃としてイスラエル・テルアビブ近郊に攻撃を実施。死者はイランで1,444人に達する。',
        summaryEn: 'US-Israel military operations against Iran continue with escalating attacks, resulting in over 1,444 deaths.'
      },
      {
        title: 'トランプ大統領、英国首相を「チャーチルではない」と批判',
        titleEn: 'Trump doubles down on \'no Churchill\' criticism',
        link: 'https://www.1news.co.nz/2026/03/18/trump-doubles-down-on-no-churchill-criticism-of-starmer/',
        source: '1News',
        date: '1 hour ago',
        snippet: 'President Trump criticized UK Prime Minister Keir Starmer after his refusal to participate in the US war against Iran.',
        summaryJa: 'トランプ米大統領は、イラン戦争への参加を拒否した英国のキア・スターマー首相を再び強く批判。「彼はチャーチルではない」と述べた。',
        summaryEn: 'President Trump criticized UK PM Starmer as "no Churchill" after his refusal to join the Iran war.'
      }
    ],
    japan: [
      {
        title: '高市首相が訪米、トランプ大統領とイラン戦争問題で綱渡り外交',
        titleEn: 'Trump-Takaichi meeting: Iran war looms large',
        link: 'https://www.cnbc.com/2026/03/18/trump-takaichi-meeting-iran-war-japan-us-self-defense-forces-hormuz-navy.html',
        source: 'CNBC',
        date: '3 hours ago',
        snippet: 'Japanese Prime Minister Sanae Takaichi visits the US for meetings with President Trump, with the Iran war overshadowing planned discussions.',
        summaryJa: '高市早苗首相が3月18日から20日まで米国を訪問し、トランプ大統領と首脳会談を実施。イラン戦争への協力要請が最大の焦点となった。',
        summaryEn: 'PM Takaichi visits the US for Trump meetings, with Iran war overshadowing planned discussions on investment.'
      },
      {
        title: '日本のガソリン価格、イラン戦争の影響で史上最高値を記録',
        titleEn: 'Japan\'s Gasoline Prices Surge to Record High',
        link: 'https://www.bloomberg.com/news/articles/2026-03-18/japan-s-gasoline-prices-surge-to-record-high-on-iran-war-impact',
        source: 'Bloomberg',
        date: '5 hours ago',
        snippet: 'Japan\'s gasoline prices hit record highs due to the Iran war impact, as Japan relies on the Middle East for over 90% of its oil.',
        summaryJa: '日本のガソリン価格がイラン戦争の影響で過去最高値を更新。日本は石油輸入の90%以上を中東に依存しており、政府は経済的打撃に備えている。',
        summaryEn: 'Japan\'s gasoline prices hit record highs as the country relies on the Middle East for over 90% of oil imports.'
      }
    ]
  };
  
  return (mockData[category] || []).slice(0, count).map((item, index) => ({
    id: `${category}-${index}`,
    category,
    ...item
  }));
}

/**
 * ニュースを取得（メイン関数）
 */
export async function fetchNews(category, useMock = true) {
  if (useMock) {
    // モックデータを使用（開発・デモ用）
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockNews(category, 5));
      }, 500 + Math.random() * 500); // ランダムな遅延でリアルさを演出
    });
  }
  
  // 実際のAPI呼び出し（バックエンド実装が必要）
  try {
    const queries = getSearchQueries()[category];
    const allResults = [];
    
    for (const query of queries) {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      if (!response.ok) continue;
      
      const data = await response.json();
      const parsed = data.results?.map(r => parseSearchResult(r, category)).filter(Boolean) || [];
      allResults.push(...parsed);
    }
    
    // 重複除去、鮮度フィルタ、制限適用
    const deduplicated = deduplicateNews(allResults);
    const fresh = filterByFreshness(deduplicated, 48);
    const limited = limitNewsItems(fresh, 5);
    
    return limited;
  } catch (error) {
    console.error(`Failed to fetch news for category ${category}:`, error);
    throw error;
  }
}

/**
 * 全カテゴリのニュースを取得
 */
export async function fetchAllNews(useMock = true) {
  try {
    const [aiNews, generalNews, japanNews] = await Promise.all([
      fetchNews(CATEGORIES.AI, useMock),
      fetchNews(CATEGORIES.GENERAL, useMock),
      fetchNews(CATEGORIES.JAPAN, useMock)
    ]);
    
    return {
      ai: aiNews,
      general: generalNews,
      japan: japanNews
    };
  } catch (error) {
    console.error('Failed to fetch all news:', error);
    throw error;
  }
}

/**
 * 日本への影響考察を生成（モック版）
 */
export function generateImpactAnalysis(newsData) {
  // 実際にはLLMを使用して生成するが、ここではモックを返す
  return {
    text: '本日最も日本への影響が大きいのは、米国・イスラエルによるイラン攻撃の長期化とホルムズ海峡封鎖である。日本は原油輸入の90%以上を中東地域に依存しており、ガソリン価格が既に史上最高値を記録するなど、国民生活への直接的影響が顕在化している。高市首相の訪米では、自衛隊派遣やホルムズ海峡での軍事協力要請が焦点となっており、日本は極めて困難な外交判断を迫られている。',
    category: '経済・外交',
    tags: ['エネルギー安全保障', '外交', '経済']
  };
}

export { CATEGORIES };
