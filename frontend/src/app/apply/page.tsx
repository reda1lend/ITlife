"use client";

import { useEffect, useMemo, useState } from "react";
import { apiGet, apiPost } from "../../lib/api";


type Course = {
  id?: number;
  title: string;
  slug: string;
  short_desc?: string;
};

type CreateLeadPayload = {
  name: string;
  contact: string;
  course_slug: string;
  age_category: "6-10" | "10-13" | "13-16";
  message: string;
};

export default function ApplyPage() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [courseSlug, setCourseSlug] = useState("");
  const [ageCategory, setAgeCategory] = useState<CreateLeadPayload["age_category"]>("6-10");
  const [message, setMessage] = useState("");

  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoadingCourses(true);
        const data = await apiGet<Course[]>("/api/courses");
        if (!mounted) return;
        setCourses(Array.isArray(data) ? data : []);
      } catch {
        if (!mounted) return;
        setCourses([]);
      } finally {
        if (!mounted) return;
        setLoadingCourses(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const selectedCourseTitle = useMemo(() => {
    const c = courses.find((x) => x.slug === courseSlug);
    return c?.title ?? "";
  }, [courses, courseSlug]);

  const canSubmit =
    name.trim().length >= 2 &&
    contact.trim().length >= 3 &&
    courseSlug.trim().length >= 1 &&
    !submitting;

  async function submit() {
    setErr(null);
    setOk(null);

    if (!canSubmit) {
      setErr("Перевір поля: ім’я, контакт і курс обов’язкові.");
      return;
    }

    const payload: CreateLeadPayload = {
      name: name.trim(),
      contact: contact.trim(),
      course_slug: courseSlug,
      age_category: ageCategory,
      message: message.trim(),
    };

    try {
      setSubmitting(true);
      await apiPost("/api/leads", payload);
      setOk(`Заявку надіслано. Ми зв’яжемось з тобою щодо курсу: ${selectedCourseTitle || "обраного курсу"}.`);
      setName("");
      setContact("");
      setCourseSlug("");
      setAgeCategory("6-10");
      setMessage("");
    } catch (e: any) {
      setErr("Не вдалося надіслати. Перевір поля і спробуй ще раз.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-5 py-12">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-white">Запис в ITlife</h1>
        <p className="mt-3 text-white/70">
          Залиш заявку — ми зв’яжемося та підберемо курс.
        </p>
      </div>

      <section className="mt-10 flex justify-center">
        <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur px-6 py-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Ім'я */}
            <div>
              <label className="block text-sm text-white/70 mb-2">Ім’я</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Максим"
                className="w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/25"
              />
            </div>

            {/* Контакт */}
            <div>
              <label className="block text-sm text-white/70 mb-2">
                Контакт (тел/telegram/email)
              </label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="@telegram або +380..."
                className="w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/25"
              />
            </div>

            {/* Курс */}
            <div>
              <label className="block text-sm text-white/70 mb-2">Курс</label>
              <select
                value={courseSlug}
                onChange={(e) => setCourseSlug(e.target.value)}
                className="w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/25"
              >
                <option value="" className="bg-black">
                  {loadingCourses ? "Завантаження..." : "Обери курс"}
                </option>

                {courses.map((c) => (
                  <option key={c.slug} value={c.slug} className="bg-black">
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Вік */}
            <div>
              <label className="block text-sm text-white/70 mb-2">Вікова категорія</label>
              <select
                value={ageCategory}
                onChange={(e) => setAgeCategory(e.target.value as CreateLeadPayload["age_category"])}
                className="w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/25"
              >
                <option value="6-10" className="bg-black">6–10 років</option>
                <option value="10-13" className="bg-black">10–13 років</option>
                <option value="13-16" className="bg-black">13–16 років</option>
              </select>
            </div>

            {/* Коментар */}
            <div className="md:col-span-2">
              <label className="block text-sm text-white/70 mb-2">Коментар</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Напиши, що саме хочеш вивчити і яка ціль."
                rows={5}
                className="w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/25 resize-none"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={submit}
              disabled={!canSubmit}
              className="rounded-2xl bg-white text-black px-6 py-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Надсилання..." : "Надіслати заявку"}
            </button>

            {err && <p className="text-red-400 text-sm">{err}</p>}
            {ok && <p className="text-green-400 text-sm">{ok}</p>}
          </div>
        </div>
      </section>
    </main>
  );
}
