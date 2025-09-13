import WriteForm from "@/components/write/CCWriteForm";

export default function BlogWritePage() {
  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 dark:text-gray-200">
            새 블로그 작성
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            경험과 지식을 블로그로 공유해주세요.
          </p>
          <div className="border-t border-gray-300 mb-5 mt-5 dark:border-gray-600"></div>
          <WriteForm type="blog" />
        </div>
      </div>
    </div>
  );
}
