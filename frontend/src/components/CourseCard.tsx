type Props = {
  title: string;
  slug: string;
  short_desc: string;
  duration_weeks: number;
  level: string;
  price_uah: number;
};

export default function CourseCard(p: Props) {
  return (
    <a
      href={`/courses/${p.slug}`}
      className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="text-white font-semibold">{p.title}</div>
        <div className="text-xs text-white/60">
          {p.duration_weeks} нед
        </div>
      </div>
      <div className="mt-2 text-sm text-white/60">{p.short_desc}</div>
      <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
        <span className="px-2 py-1 rounded-full bg-white/10">уровень: {p.level}</span>
        <span className="px-2 py-1 rounded-full bg-white/10">{p.price_uah} грн</span>
        <span className="ml-auto text-white/60 group-hover:text-white">Подробнее →</span>
      </div>
    </a>
  );
}
