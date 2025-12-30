"use client";

import { useState } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=1200&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&q=80",
  "https://images.unsplash.com/photo-1507504031007-95a3f88f8b66?w=1200&q=80",
];

export default function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);

  return (
    <section className="mt-12">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        Recuerdos (galería)
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {IMAGES.map((src, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="overflow-hidden rounded-lg"
          >
            <img
              src={src}
              alt={`img-${i}`}
              className="w-full h-40 object-cover hover:scale-105 transition-transform"
            />
          </button>
        ))}
      </div>

      {idx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
          onClick={() => setIdx(null)}
        >
          <img
            src={IMAGES[idx]}
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
