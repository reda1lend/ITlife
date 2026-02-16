"use client";

import { useEffect, useMemo, useState } from "react";
import { apiGet, apiPost } from "../../lib/api";

type Course = { title: string; slug: string; };

export default function ApplyPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const params = useMemo(() => new URLSearchParams(typeof window !== "undefined" ? window.location.search : ""), []);
  const presetCourse = params.get("course") || "";

  const [form, setForm] = useState({
    name: "",
    contact: "",
    course_slug: presetCourse,
    level: "unknown",
    message: ""
  });

  useEffect(() => {
    apiGet<Course[]>("/api/courses").then(setCourses).catch(() => setCourses([]));
  }, []);

  async function submit() {
    setLoading(true); setOk(null); setErr(null);
    try {
      const res = await apiPost<any>("/api/leads", form);
      setOk(`Заявка отправлена ✅ ID: ${res.id}`);
      setForm({ ...form, message: "" });
    } catch (e: any) {
      setErr("Не удалось отправить. Проверь поля и попробуй снова.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-semibold">Запись в ITlife</h1>
      <p className="mt-2 text-white/60">Оставь заявку — мы свяжемся и подберём курс.</p>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-7">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="text-sm text-white/70">
            Имя
            <input
              className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Максим"
            />
          </label>

          <label className="text-sm text-white/70">
            Контакт (тел/telegram/email)
            <input
              className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
              value={form.contact}
              onChange={e => setForm({ ...form, contact: e.target.value })}
              placeholder="@telegram или +380..."
            />
          </label>

          <label className="text-sm text-white/70">
            Курс
            <select
              className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
              value={form.course_slug}
              onChange={e => setForm({ ...form, course_slug: e.target.value })}
            >
              <option value="">Выбери курс</option>
              {courses.map(c => <option key={c.slug} value={c.slug}>{c.title}</option>)}
            </select>
          </label>

          <label className="text-sm text-white/70">
            Уровень
            <select
              className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
              value={form.level}
              onChange={e => setForm({ ...form, level: e.target.value })}
            >
              <option value="unknown">Не знаю</option>
              <option value="beginner">Новичок</option>
              <option value="basic">Базовый</option>
              <option value="middle">Уверенный</option>
            </select>
          </label>
        </div>

        <label className="text-sm text-white/70 block mt-4">
          Комментарий
          <textarea
            className="mt-2 w-full min-h-[110px] rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            placeholder="Хочу курс, чтобы за 1-2 месяца собрать проект…"
          />
        </label>

        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <button
            onClick={submit}
            disabled={loading}
            className="px-5 py-3 rounded-2xl bg-white text-black font-medium disabled:opacity-60"
          >
            {loading ? "Отправка..." : "Отправить заявку"}
          </button>

          {ok && <div className="text-sm text-white/80">{ok}</div>}
          {err && <div className="text-sm text-red-300">{err}</div>}
        </div>
      </div>
    </main>
  );
}
