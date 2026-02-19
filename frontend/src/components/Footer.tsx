export default function Footer() {
  return (
    <div className="border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-5 py-10 text-sm text-white/60 flex flex-col gap-2">
        <div>© {new Date().getFullYear()} ITlife</div>
        <div>Контакты: Telegram @astrAln11  • Email itlifeschool@gmail.com</div>
      </div>
    </div>
  );
}
