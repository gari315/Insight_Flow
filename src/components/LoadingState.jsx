/**
 * ローディング状態コンポーネント
 */
export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent-blue border-t-transparent"></div>
      <p className="text-gray-400 text-sm">ニュースを取得中...</p>
    </div>
  );
}
