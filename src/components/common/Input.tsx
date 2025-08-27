interface IInputProps {
  label: string;
  type?: "text" | "number";
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}
export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}: IInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 `}
      />
      <div className="h-5 mt-1">
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
}
