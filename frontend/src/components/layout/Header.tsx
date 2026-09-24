export default function Header() {
  return (
    <header className="p-4 border-b border-surface-container flex items-center justify-between">
      <div className="font-headline-md font-bold text-lg">KAAL AI</div>
      <nav>
        <a href="/login" className="text-secondary hover:underline">Login</a>
      </nav>
    </header>
  );
}
