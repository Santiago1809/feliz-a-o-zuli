"use client";

import { useState } from "react";

const QUESTIONS = [
  {
    q: "¿Cuánto me amas?",
    choices: [
      "Mucho mucho",
      "Más o menos, depende del día",
      "Poco, yo que lo voy a querer ome feo",
    ],
    a: 0,
  },
  {
    q: "¿Vas a dejarme algún día?",
    choices: ["Sí, chao", "Claro, mañana", "Nunca, te amo y nunca te dejaría"],
    a: 2,
  },
  {
    q: "¿Tienes gripa 🙈❤️?",
    choices: ["No, que va 😠", "Sí 🙈", "A veces, cuando hace frío sí"],
    a: 1,
  },
];

export default function Quiz() {
  const [answers, setAnswers] = useState<number[]>(
    Array(QUESTIONS.length).fill(-1)
  );
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedOk, setSavedOk] = useState<null | boolean>(null);

  function setAnswer(i: number, val: number) {
    const copy = [...answers];
    copy[i] = val;
    setAnswers(copy);
  }

  const score = answers.reduce(
    (s, a, i) => s + (a === QUESTIONS[i].a ? 1 : 0),
    0
  );

  return (
    <section className="mt-8 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-purple-100 shadow-md">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Pequeño quiz
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Responde lo que recuerdes; es sólo para divertirnos.
      </p>

      <div className="space-y-4">
        {QUESTIONS.map((item, i) => (
          <div key={i} className="p-4 bg-white rounded-lg border">
            <div className="font-medium text-gray-800 mb-3">{item.q}</div>
            <div className="flex flex-col md:flex-row gap-3">
              {item.choices.map((c, j) => (
                <button
                  key={j}
                  onClick={() => setAnswer(i, j)}
                  className={`px-4 py-2 rounded-md border ${
                    answers[i] === j
                      ? "bg-purple-500 text-white border-purple-500"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={async () => {
            setSubmitted(true);
            setSaving(true);
            try {
              // send the actual answer values (choice text) instead of positions
              const payloadAnswers = answers.map((a, idx) => {
                const choice = QUESTIONS[idx]?.choices?.[a as number];
                return typeof choice === "string" ? choice : null;
              });

              const res = await fetch("/api/quiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers: payloadAnswers, score }),
              });
              const data = await res.json();
              const ok = Boolean(data?.success);
              setSavedOk(ok);
              if (ok) {
                // Keep `submitted` true so score remains visible, then reset after 5s
                setSavedOk(true);
                setTimeout(() => {
                  setAnswers(Array(QUESTIONS.length).fill(-1));
                  setSubmitted(false);
                  setSavedOk(null);
                }, 2500);
              }
            } catch (e) {
              console.error(e);
              setSavedOk(false);
            }
            setSaving(false);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded-md shadow"
          disabled={saving}
        >
          {saving ? "Guardando..." : "Enviar"}
        </button>
        {submitted && (
          <div className="text-sm text-gray-700">
            Tu puntuación:
            <strong className="text-purple-600">
              {score}/{QUESTIONS.length}
            </strong>
            {savedOk === true && (
              <span className="ml-3 text-green-600">Guardado ✅</span>
            )}
            {savedOk === false && (
              <span className="ml-3 text-red-600">Error al guardar</span>
            )}
            {score < 3 && (
              <div className="text-sm text-red-600 mt-2 italic">
                No me amas, buaa
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
