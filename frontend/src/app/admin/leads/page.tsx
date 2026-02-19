"use client";

import { useEffect, useState } from "react";
import { apiGet, apiPatch } from "@/lib/api";
import { getToken, clearToken } from "@/lib/auth";

type Lead = {
  id: number; name: string; contact: string;
  course_slug: string; level: string; message: string;
  status: string; admin_note: string; created_at: string; age_category?: string | null;
};

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setErr(null);
    const token = getToken();
    if (!token) { window.location.href = "/admin/login"; return; }

    try {
      const data = await apiGet<Lead[]>("/api/admin/leads", token);
      setLeads(data);
    } catch {
      setErr("Нет доступа. Перезайди.");
    }
  }

  useEffect(() => { load(); }, []);

  async function update(id: number, patch: Partial<Pick<Lead, "status" | "admin_note">>) {
    const token = getToken();
    if (!token) return;

    const updated = await apiPatch<Lead>(`/api/admin/leads/${id}`, patch, token);
    setLeads(prev => prev.map(x => x.id === id ? updated : x));
  }

  function logout() {
    clearToken();
    window.location.href = "/admin/login";
  }

  return (
    <main className="max-w-6xl mx-auto px-5 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Заявки</h1>
          <div className="text-white/60 mt-1">Управляй статусами и заметками.</div>
        </div>
        <button onClick={logout} className="px-4 py-2 rounded-2xl border border-white/15 hover:bg-white/5">
          Выйти
        </button>
      </div>

      {err && <div className="mt-5 text-red-300">{err}</div>}

      <div className="mt-8 grid gap-4">
        {leads.map(l => (
          <div key={l.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className="font-semibold">{l.name}</div>
              <div className="text-white/60 text-sm">{l.contact}</div>
              <div className="ml-auto text-xs text-white/50">ID {l.id} • {new Date(l.created_at).toLocaleString()}</div>
            </div>

            <div className="mt-2 text-sm text-white/70">
              Курс: <span className="text-white/90">{l.course_slug}</span> • Возраст: {l.age_category}


            </div>

            {l.message && (
              <div className="mt-3 text-sm text-white/60 whitespace-pre-line">
                {l.message}
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-3 items-center">
              <select
                className="rounded-2xl bg-black/30 border border-white/10 px-4 py-2 outline-none"
                value={l.status}
                onChange={e => update(l.id, { status: e.target.value })}
              >
                <option value="new">new</option>
                <option value="in_progress">in_progress</option>
                <option value="closed">closed</option>
              </select>

              <input
                className="flex-1 min-w-[220px] rounded-2xl bg-black/30 border border-white/10 px-4 py-2 outline-none"
                defaultValue={l.admin_note}
                onBlur={e => update(l.id, { admin_note: e.target.value })}
                placeholder="Заметка админа (сохранится по потере фокуса)"
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
