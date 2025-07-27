interface BadgeProps {
  text: string;
}

const Badge = ({ text }: BadgeProps) => {
  return (
    <div>
      <div className="justify-center mb-8 px-6 py-3 text-sm font-semibold rounded-full border bg-cert-dark-red/5 border-cert-dark-red/20 text-cert-dark-red ">
        {text}
      </div>
    </div>
  );
};
export default Badge;
