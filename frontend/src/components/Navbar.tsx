export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-black/30 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <a href="/" className="font-semibold tracking-tight text-white">
          ITlife<span className="text-white/50">.school</span>
        </a>
        <div className="flex gap-4 text-sm text-white/70">
          <a className="hover:text-white" href="/courses">Курсы</a>
          <a className="hover:text-white" href="/apply">Запись</a>
          <a className="hover:text-white" href="/admin/login">Админ</a>
        </div>
      </div>
    </div>
  );
}
