/**
 * 検索結果のパース・整形ユーティリティ
 */

/**
 * 検索結果から重複を除去
 */
export function deduplicateNews(newsItems) {
  const seen = new Set();
  return newsItems.filter(item => {
    const key = item.link || item.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * ニュースの鮮度でフィルタリング（48時間以内）
 */
export function filterByFreshness(newsItems, hoursLimit = 48) {
  const now = new Date();
  const limitMs = hoursLimit * 60 * 60 * 1000;
  
  return newsItems.filter(item => {
    if (!item.date) return true; // 日付不明の場合は含める
    
    const itemDate = parseDateString(item.date);
    if (!itemDate) return true;
    
    const diffMs = now - itemDate;
    return diffMs <= limitMs;
  });
}

/**
 * 日付文字列をDateオブジェクトに変換
 */
function parseDateString(dateStr) {
  if (!dateStr) return null;
  
  // "X hours ago", "X days ago" などの相対表記をパース
  const hoursMatch = dateStr.match(/(\d+)\s*(hour|時間)/i);
  if (hoursMatch) {
    const hours = parseInt(hoursMatch[1]);
    return new Date(Date.now() - hours * 60 * 60 * 1000);
  }
  
  const daysMatch = dateStr.match(/(\d+)\s*(day|日)/i);
  if (daysMatch) {
    const days = parseInt(daysMatch[1]);
    return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  }
  
  // 標準的な日付フォーマットをパース
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * 検索結果を指定件数に制限
 */
export function limitNewsItems(newsItems, limit = 5) {
  return newsItems.slice(0, limit);
}

/**
 * ニュースアイテムのバリデーション
 */
export function validateNewsItem(item) {
  return item && item.title && (item.link || item.snippet);
}

/**
 * 検索結果をアプリ用のニュースオブジェクトに変換
 */
export function parseSearchResult(result, category) {
  if (!result || !validateNewsItem(result)) return null;
  
  return {
    id: result.link || `${category}-${Date.now()}-${Math.random()}`,
    title: result.title || '(タイトルなし)',
    titleEn: extractEnglishTitle(result.title),
    link: result.link || null,
    source: extractSource(result.link),
    date: result.date || null,
    snippet: result.snippet || '',
    category: category,
    summaryJa: generateSummary(result.snippet, 'ja'),
    summaryEn: generateSummary(result.snippet, 'en'),
  };
}

/**
 * タイトルから英語部分を抽出（存在する場合）
 */
function extractEnglishTitle(title) {
  if (!title) return '';
  
  // 英語部分を含む可能性のあるパターン
  const match = title.match(/[A-Z][a-zA-Z\s]+/);
  return match ? match[0].trim() : '';
}

/**
 * URLからソース名を抽出
 */
function extractSource(url) {
  if (!url) return 'Unknown';
  
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace('www.', '');
    const parts = hostname.split('.');
    
    // ドメイン名を整形（例: nytimes.com -> NYTimes）
    if (parts.length >= 2) {
      const domain = parts[parts.length - 2];
      return domain.charAt(0).toUpperCase() + domain.slice(1);
    }
    
    return hostname;
  } catch (e) {
    return 'Unknown';
  }
}

/**
 * スニペットから要約を生成（簡易版）
 */
function generateSummary(snippet, lang = 'ja') {
  if (!snippet) return '';
  
  // 簡易的な要約：最初の3文程度を取得
  const sentences = snippet.split(/[.。]/);
  const summary = sentences.slice(0, 3).join(lang === 'ja' ? '。' : '. ');
  
  return summary.length > 200 ? summary.slice(0, 200) + '...' : summary;
}
