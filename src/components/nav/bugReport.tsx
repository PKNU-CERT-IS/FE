import BugSVG from "/public/icons/bug.svg";

export default function BugReport({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSdTj_umu9UGkrO6tPGB13lJGAAaDAF0X--1_GvnFEmFwYuCTg/viewform?usp=header"
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center px-3 py-1.5 group border border-cert-dark-red rounded-md transition-all duration-300 shadow-cert-navbar hover:shadow-lg hover:bg-cert-red/10 hover:border-cert-dark-red whitespace-nowrap ${className}`}
    >
      <BugSVG className="w-4 h-4 text-cert-dark-red group-hover:text-cert-dark-red dark:text-cert-red dark:group-hover:text-cert-red" />
      <div className="text-cert-dark-red group-hover:text-cert-dark-red ml-3 dark:text-cert-red dark:group-hover:text-cert-red">
        Bug Report
      </div>
    </a>
  );
}
