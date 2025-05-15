const buttonStyles: Record<string, { color: string; hoverColor: string }> = {
  teal: { color: "bg-[#00c7c7]", hoverColor: "hover:bg-[#009999]" },
  pink: { color: "bg-[#f4546a]", hoverColor: "hover:bg-[#d93f58]" },
};

const BuyButton = ({
  label,
  type,
  onClick,
}: {
  label: string;
  type: keyof typeof buttonStyles;
  onClick?: () => void;
}) => {
  const { color, hoverColor } = buttonStyles[type] || buttonStyles.teal;

  return (
    <button
      className={`cursor-pointer text-white font-bold py-2 px-4 rounded transition ${color} ${hoverColor}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default BuyButton;
