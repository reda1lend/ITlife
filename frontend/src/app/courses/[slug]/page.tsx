import { apiGet } from "../../../lib/api";

type Course = {
  title: string; slug: string; short_desc: string;
  duration_weeks: number; level: string; price_uah: number;
  format: string; description: string;
};

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const c = await apiGet<Course>(`/api/courses/${params.slug}`);

  return (
    <main className="max-w-4xl mx-auto px-5 py-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
        <div className="text-white/60 text-sm">Курс</div>
        <h1 className="mt-2 text-3xl font-semibold">{c.title}</h1>
        <p className="mt-3 text-white/60">{c.short_desc}</p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
          <span className="px-2 py-1 rounded-full bg-white/10">{c.duration_weeks} недель</span>
          <span className="px-2 py-1 rounded-full bg-white/10">уровень: {c.level}</span>
          <span className="px-2 py-1 rounded-full bg-white/10">формат: {c.format}</span>
          <span className="px-2 py-1 rounded-full bg-white/10">{c.price_uah} грн</span>
        </div>

        <div className="mt-6 whitespace-pre-line text-sm text-white/70 leading-relaxed">
          {c.description}
        </div>

        <div className="mt-8 flex gap-3">
          <a href={`/apply?course=${c.slug}`} className="px-5 py-3 rounded-2xl bg-white text-black font-medium">
            Записаться
          </a>
          <a href="/courses" className="px-5 py-3 rounded-2xl border border-white/15 text-white/90 hover:bg-white/5">
            Назад
          </a>
        </div>
      </div>
    </main>
  );
}
