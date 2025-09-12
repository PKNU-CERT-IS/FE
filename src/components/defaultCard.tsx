interface CardProps {
  title: string;
  text?: string;
  svgComponent: React.ReactNode;
}

const DefaultCard = ({ title, text, svgComponent }: CardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col space-y-1.5 p-6 text-center pb-6 items-center">
        <div className="mb-6">{svgComponent}</div>
        <div className="font-semibold tracking-tight text-gray-900 text-lg dark:text-gray-100">
          {title}
        </div>
        <div className="p-1">
          <div className="text-sm text-gray-600 text-center leading-relaxed dark:text-gray-100">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DefaultCard;
