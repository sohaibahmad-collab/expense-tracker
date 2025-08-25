interface IButtonProps {
  buttonText: string;
  onClick?: () => void;
  variant?: "primary" | "danger";
}

export default function Button({
  buttonText,
  onClick,
  variant = "primary",

}: IButtonProps) {
  const base =
    "px-3 py-1 rounded-lg text-white font-medium transition";

  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600",
    danger: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {buttonText}
    </button>
  );
}
