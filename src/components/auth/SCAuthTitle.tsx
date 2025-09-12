"server-only";

import LogoSVG from "/public/icons/logo-white.svg";

interface AuthTitleProps {
  title: string;
  description: string;
}

export default function SCAuthTitle({ title, description }: AuthTitleProps) {
  return (
    <div className="text-center space-y-4 flex flex-col p-6 mb-0 ">
      <div className="flex justify-center">
        <div className="relative w-16 h-16 mb-6">
          <LogoSVG className="drop-shadow-lg" />
          <div className="absolute inset-0 rounded-full blur-lg opacity-15 bg-cert-red" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2 dark:text-gray-200">
          CERT-IS {title}
        </div>
        <div className="text-gray-600 dark:text-gray-400 text-sm">
          {description}
        </div>
      </div>
    </div>
  );
}
