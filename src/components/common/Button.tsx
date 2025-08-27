interface IButtonProps {
  buttonText: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "danger";
}

export default function Button({
  buttonText,
  onClick,
  type,
  variant = "primary",
  disabled = false,
}: IButtonProps) {
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600",
    danger: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1 rounded-lg text-white font-medium transition ${
        variants[variant]
      } ${disabled ? "opacity-50 cursor-not-allowed hover:bg-none" : ""}`}
    >
      {buttonText}
    </button>
  );
}
