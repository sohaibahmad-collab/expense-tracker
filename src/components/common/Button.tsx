import { Edit, Trash } from "lucide-react";

interface IButtonProps {
  buttonText?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "danger";
  icon?: "edit" | "delete";
}

export default function Button({
  buttonText,
  onClick,
  type,
  variant = "primary",
  disabled = false,
  icon,
}: IButtonProps) {
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600",
    danger: "bg-red-500 hover:bg-red-600",
  };

  if (icon) {
    if (icon === "edit")
      return (
        <Edit
          onClick={onClick}
          className="w-6 h-6 mr-2 hover:text-green-500 cursor-pointer transition-colors"
        />
      );
    if (icon === "delete")
      return (
        <Trash
          onClick={onClick}
          className="w-6 h-6 mr-2 hover:text-red-500 cursor-pointer transition-colors"
        />
      );
  }

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
