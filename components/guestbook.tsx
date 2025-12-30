"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Msg {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export default function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data?.success) setMessages(data.messages || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name || "Anonimo", message }),
      });
      const data = await res.json();
      if (data?.success) {
        setMessage("");
        setName("");
        fetchMessages();
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <section className="mt-8 bg-white/80 backdrop-blur-sm border border-purple-100 rounded-2xl p-6 shadow-sm">
      <nav className="flex items-center gap-3 mb-4">
        <Link href="/" className="text-sm text-blue-700 hover:underline">
          Inicio
        </Link>
        <Link href="/guestbook" className="text-sm text-blue-700 font-semibold">
          Guestbook
        </Link>
        <Link href="/quiz" className="text-sm text-blue-700 hover:underline">
          Quiz
        </Link>
      </nav>
      <div className="flex flex-col md:flex-row gap-4">
        <form onSubmit={submit} className="flex-1 flex flex-col gap-3">
          <label className="text-sm text-gray-700">Tu nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className="p-2 rounded border"
          />
          <label className="text-sm text-gray-700">Tu mensaje</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe algo bonito..."
            className="p-2 rounded border h-28"
          />
          <div className="flex items-center gap-3">
            <button
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded shadow"
            >
              Enviar
            </button>
            <button
              type="button"
              onClick={() => {
                setName("");
                setMessage("");
              }}
              className="text-sm text-gray-500"
            >
              Limpiar
            </button>
            <button
              type="button"
              onClick={fetchMessages}
              className="ml-auto text-sm text-blue-600"
            >
              Refrescar
            </button>
          </div>
        </form>

        <div className="w-full md:w-1/2">
          <h4 className="text-sm text-gray-600 mb-2">Mensajes recientes</h4>
          <div className="space-y-3 max-h-64 overflow-auto">
            {messages.length === 0 ? (
              <div className="text-sm text-gray-500">No hay mensajes aún.</div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className="p-3 rounded bg-white border shadow-sm"
                >
                  <div className="text-sm text-gray-800">{m.message}</div>
                  <div className="text-xs text-gray-400 mt-2">
                    — {m.name} · {formatUTCMinus5(m.created_at)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function formatUTCMinus5(ts: string) {
  // Desired output: "30 dic. 2025" (es-ES short month)
  const re =
    /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:([+-])(\d{2}):?(\d{2})?)?$/;
  const m = re.exec(ts);

  // If stored datetime has no timezone offset (naive), format the Y-M-D and time as-is (assume UTC-5)
  if (m && !m[7]) {
    const [, Y, Mo, D, hh, mm] = m;
    const dt = new Date(
      Date.UTC(
        Number(Y),
        Number(Mo) - 1,
        Number(D),
        Number(hh || "0"),
        Number(mm || "0")
      )
    );
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    }).format(dt);
  }

  // Otherwise parse and shift the instant to UTC-5 wall time
  const parsed = new Date(ts);
  if (isNaN(parsed.getTime())) return ts;

  const targetMillis = parsed.getTime() - 5 * 60 * 60 * 1000;
  const dt = new Date(targetMillis);

  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(dt);
}
