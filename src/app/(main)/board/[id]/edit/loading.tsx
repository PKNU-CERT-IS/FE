export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cert-red"></div>
      <span className="ml-2 text-gray-600">불러오는 중...</span>
    </div>
  );
}
