"server-only";

export default function SCScheduleSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
                  ></div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-gray-200 dark:bg-gray-700 rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* 사이드 영역 */}
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-gray-200 dark:bg-gray-700 rounded"
                  ></div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 bg-gray-200 dark:bg-gray-700 rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="my-12">
          <div className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
