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
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 `}
        />

        {error && (
          <p className="absolute h-9 w-70  top-9 left-0 text-red-500 text-[12px] mt-1">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
