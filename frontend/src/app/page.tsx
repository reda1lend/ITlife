export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-5">
      <section className="py-16">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-8 md:p-12">
          <div className="text-white/70 text-sm">Школа практического IT</div>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
            ITlife — старт в IT через практику
          </h1>
          <p className="mt-4 text-white/60 max-w-2xl">
            Курсы для новичков и тех, кто хочет системно прокачаться.
            Домашки, ревью, финальный проект и портфолио.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/apply" className="px-5 py-3 rounded-2xl bg-white text-black font-medium">
              Записаться
            </a>
            <a href="/courses" className="px-5 py-3 rounded-2xl border border-white/15 text-white/90 hover:bg-white/5">
              Посмотреть курсы
            </a>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {[
              ["Практика с 1-й недели", "Сразу пишем код/делаем дизайн, без воды."],
              ["Ментор и ревью", "Проверка домашек и понятные правки."],
              ["Проект в портфолио", "Финальная работа, которую не стыдно показать."]
            ].map((x) => (
              <div key={x[0]} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="font-semibold">{x[0]}</div>
                <div className="text-sm text-white/60 mt-1">{x[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-2xl font-semibold">Как проходит обучение</h2>
        <div className="mt-4 grid md:grid-cols-5 gap-3">
          {[
            "Диагностика уровня",
            "План + материалы",
            "Практика и домашки",
            "Проект + ревью",
            "Портфолио"
          ].map((t, i) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/50">Шаг {i + 1}</div>
              <div className="mt-1 font-medium">{t}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-xl font-semibold">Готов начать?</div>
            <div className="text-white/60 mt-1">Оставь заявку — мы подберём курс под твой уровень.</div>
          </div>
          <a href="/apply" className="px-5 py-3 rounded-2xl bg-white text-black font-medium w-fit">
            Оставить заявку
          </a>
        </div>
      </section>
    </main>
  );
}
