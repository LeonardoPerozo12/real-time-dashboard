export default function Header() {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Real-time Dashboard</h1>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="rounded-full w-8 h-8"
          />
          <span>John Doe</span>
        </div>
      </div>
    </header>
  );
}
