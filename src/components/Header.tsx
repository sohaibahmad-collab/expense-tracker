type HeaderProps = {
  total: number;
};

export default function Header({ total }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-semibold">Expense Tracker</h1>
      <p className="text-gray-600">Total: ${total.toFixed(2)}</p>
    </div>
  );
}
