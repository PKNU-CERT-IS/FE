interface PageLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

// PageLayout.tsx
export default function PageLayout({
  title,
  description,
  icon,
  children,
}: PageLayoutProps) {
  return (
    <div className="pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 text-cert-dark-red dark:text-cert-red">
              {icon}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 cursor-default dark:text-gray-200">
              {title}
            </h1>
          </div>
          <p className="text-gray-600 cursor-default dark:text-gray-300">
            {description}
          </p>
        </div>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}
