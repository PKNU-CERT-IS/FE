"server-only";
interface DefaultNoneResultUiProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const DefaultNoneResultUi = ({
  icon,
  title,
  description,
}: DefaultNoneResultUiProps) => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 text-gray-300 mx-auto mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title} </h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};
export default DefaultNoneResultUi;
