/**
 * ニュースデータ取得用カスタムフック
 */
import { useState, useEffect, useCallback } from 'react';
import { fetchAllNews, generateImpactAnalysis } from '../services/searchService';

export function useNewsData() {
  const [newsData, setNewsData] = useState({
    ai: [],
    general: [],
    japan: []
  });
  const [impactAnalysis, setImpactAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // ニュースを取得
  const loadNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // ニュースデータ取得（現在はモックモード）
      const data = await fetchAllNews(true);
      setNewsData(data);
      
      // 日本への影響分析を生成
      const analysis = generateImpactAnalysis(data);
      setImpactAnalysis(analysis);
      
      // 最終更新時刻を記録
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Failed to load news:', err);
      setError('ニュースの取得に失敗しました。しばらくしてから再度お試しください。');
    } finally {
      setLoading(false);
    }
  }, []);

  // 初回ロード
  useEffect(() => {
    loadNews();
  }, [loadNews]);

  // 手動更新
  const refresh = useCallback(() => {
    loadNews();
  }, [loadNews]);

  return {
    newsData,
    impactAnalysis,
    loading,
    error,
    lastUpdate,
    refresh
  };
}
