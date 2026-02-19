"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";
import { setToken } from "@/lib/auth";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@itlife.school");
  const [password, setPassword] = useState("admin12345");
  const [err, setErr] = useState<string | null>(null);

  async function login() {
    setErr(null);
    try {
      const res = await apiPost<{ access_token: string }>("/api/auth/login", { email, password });
      setToken(res.access_token);
      window.location.href = "/admin/leads";
    } catch {
      setErr("Неверный логин или пароль");
    }
  }

  return (
    <main className="max-w-md mx-auto px-5 py-12">
      <h1 className="text-3xl font-semibold">Админ ITlife</h1>
      <p className="mt-2 text-white/60">Вход для просмотра заявок.</p>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-7">
        <label className="text-sm text-white/70">
          Email
          <input className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
            value={email} onChange={e => setEmail(e.target.value)} />
        </label>

        <label className="text-sm text-white/70 block mt-4">
          Пароль
          <input type="password" className="mt-2 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
            value={password} onChange={e => setPassword(e.target.value)} />
        </label>

        <button onClick={login} className="mt-6 w-full px-5 py-3 rounded-2xl bg-white text-black font-medium">
          Войти
        </button>

        {err && <div className="mt-3 text-sm text-red-300">{err}</div>}
      </div>
    </main>
  );
}
