import CourseCard from "../../components/CourseCard";
import { apiGet } from "../../lib/api";

type Course = {
  title: string; slug: string; short_desc: string;
  duration_weeks: number; level: string; price_uah: number;
  format: string; description: string;
};

export default async function CoursesPage() {
  const courses = await apiGet<Course[]>("/api/courses");

  return (
    <main className="max-w-6xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-semibold">Курсы ITlife</h1>
      <p className="mt-2 text-white/60">Выбирай направление и залетай в обучение.</p>

      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {courses.map(c => (
          <CourseCard key={c.slug} {...c} />
        ))}
      </div>
    </main>
  );
}
