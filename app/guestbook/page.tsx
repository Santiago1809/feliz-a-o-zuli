"use client";

import Guestbook from "@/components/guestbook";

export default function GuestbookPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-yellow-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-yellow-200 mb-4">
          Déjame un mensaje
        </h1>
        <p className="text-purple-200 mb-6">
          Aquí podrás dejarme algo bonito. ¡Gracias por participar!
        </p>
        <Guestbook />
      </div>
    </main>
  );
}
