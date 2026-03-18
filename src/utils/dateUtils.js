/**
 * 相対時刻表示のためのユーティリティ
 */
export function getRelativeTime(dateString) {
  if (!dateString) return '';
  
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'たった今';
  if (diffMins < 60) return `${diffMins}分前`;
  if (diffHours < 24) return `${diffHours}時間前`;
  if (diffDays < 7) return `${diffDays}日前`;
  
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
}

/**
 * 現在の日付をフォーマット
 */
export function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekday = ['日', '月', '火', '水', '木', '金', '土'][now.getDay()];
  
  return `${year}年${month}月${day}日（${weekday}）`;
}

/**
 * 検索クエリ用の日付フォーマット（YYYY-MM-DD）
 */
export function getSearchDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * 日本語の日付フォーマット（YYYY年MM月DD日）
 */
export function getJapaneseDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  
  return `${year}年${month}月${day}日`;
}
