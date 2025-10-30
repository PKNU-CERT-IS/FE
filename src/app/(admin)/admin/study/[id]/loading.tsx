export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500"></div>
    </div>
  );
}
