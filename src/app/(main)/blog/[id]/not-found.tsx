import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        {/* 404 일러스트 */}
        <div className="mb-8">
          <div className="text-8xl mb-4">🔍</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            게시글을 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 leading-relaxed">
            요청하신 게시글이 존재하지 않거나 삭제되었을 수 있습니다.
            <br />
            URL을 다시 확인해 주세요.
          </p>
        </div>

        {/* 액션 버튼들 */}
        <div className="space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            블로그 목록으로 돌아가기
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            홈으로 가기
          </Link>
        </div>

        {/* 추가 도움말 */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>💡 도움말:</strong>
            <br />
            블로그 목록에서 원하는 게시글을 찾아보거나, 검색 기능을 이용해
            보세요.
          </p>
        </div>
      </div>
    </div>
  );
}
