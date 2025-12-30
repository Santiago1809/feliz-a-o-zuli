"use client";

import Quiz from "@/components/quiz";

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-yellow-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-yellow-200 mb-4">
          Pequeño quiz
        </h1>
        <p className="text-purple-200 mb-6">
          Una forma divertida de interactuar. Responde y comprueba tu
          puntuación.
        </p>
        <Quiz />
      </div>
    </main>
  );
}
