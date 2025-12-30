"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Clock, Sparkles } from "lucide-react";

// Fecha: 1 enero 2026
const TARGET_DATE = new Date("2026-01-01T00:00:00-05:00").getTime();

const letters = [
  {
    id: 1,
    title: "Gratitud",
    content: `Zulicita mía, este año ha sido para ambos de gran aprendizaje y progreso. Aunque hace un año las cosas eran muy distintas y cometíamos muchos errores, doy gracias a Dios porque he podido aprender y corregirme estando a tu lado. Si he crecido, ha sido por Él, contigo y por ti. Te agradezco infinitamente la paciencia que día a día me tienes, porque sé que no ha de ser fácil a veces entenderme y puedo llegar a confundirte. Gracias por quedarte a mi lado cuando nadie más lo ha hecho; has sido mi cómplice, mi confidente, mi compañera de risas y también de llantos. Por ello y más, te doy mil y mil gracias, mi corazón.`,
  },
  {
    id: 2,
    title: "Alegría",
    content: `Aunque han sido pocas las veces en que he podido verte, cada encuentro llena mi corazón de alegría, aliento, ánimo y paz. Solo necesito escuchar tu voz para que mi ritmo cardíaco se serene, y solo necesito que te acerques un poco para que mi corazón lata con ansias. Gracias por dejarme verte reír aun cuando has tenido días sin ánimos o cuando no ha sido fácil encontrar motivos. Gracias por ser genuinamente tú conmigo; por llamarme la atención, por preocuparte por mí, por animarme, por escucharme, por abrirme tu corazón, por ser la mujer que amo, adoro, sueño y anhelo.`,
  },
  {
    id: 3,
    title: "Deseos",
    content: `Esta es la segunda vez que puedo desearte un feliz año, y si me lo preguntas, eso es lo que más alegría me da: empezar y cerrar un año contigo. Aunque quizá no físicamente, en mi corazón siempre te siento cerca; mi alma no se desapega de ti, y por eso estás a mi lado como yo al tuyo. Te amo, y espero que este nuevo año podamos crecer mucho juntos en cada ámbito de nuestras vidas. Que todos los sufrimientos y el estrés que este año pasado te trajo se transformen en felicidad, paz y alegría en el año que comienza.`,
  },
  {
    id: 4,
    title: "Promesa",
    content: `Eres mi compañerita, y en este momento solo puedo imaginar un futuro cada día más cercano, donde seamos una familia, celebrando no solo un año más juntos, sino celebrando cada día, porque estar contigo es la victoria sobre la tristeza y la soledad. Mientras tenga vida, y mientras estés en mi vida, y sigamos andando de la mano de Dios, la tristeza nunca más me vencerá, ni lo hará contigo.`,
  },
];

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function LoveLetterPage() {
  // Simple motion transforms (no parallax) to avoid complexity/hydration issues
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculate = () => {
      const now = Date.now();
      const diff = TARGET_DATE - now;

      if (diff <= 0) {
        setIsUnlocked(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculate());
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center">
        <Heart className="w-12 h-12 text-rose-400 animate-pulse" />
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-linear-to-br from-rose-50 via-pink-50 to-rose-100 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-2xl mx-auto">
          <Heart
            className="w-24 h-24 text-rose-400 mx-auto animate-pulse"
            fill="currentColor"
          />
          <h1 className="text-3xl md:text-4xl font-serif text-rose-800 mb-4">
            Algo especial te espera...
          </h1>
          <p className="text-rose-600 mb-8 text-lg">
            Este mensaje se desbloqueará el 1 de enero de 2026 a la medianoche
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Clock className="w-5 h-5 text-rose-500" />
            <span className="text-rose-500 text-sm">Hora Colombia (UTC-5)</span>
          </div>

          <div className="grid grid-cols-4 gap-3 md:gap-4 mb-8">
            <TimeBlock value={timeLeft.days} label="Días" />
            <TimeBlock value={timeLeft.hours} label="Horas" />
            <TimeBlock value={timeLeft.minutes} label="Min" />
            <TimeBlock value={timeLeft.seconds} label="Seg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 via-purple-800 to-yellow-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <Heart className="w-12 h-12 text-purple-300" fill="currentColor" />
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </div>
          <h1
            className="text-4xl md:text-5xl font-semibold text-yellow-200 mb-1"
            style={{
              fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto",
            }}
          >
            Para mi Zulicita
          </h1>
          <p className="text-purple-200 italic">¡Feliz Año Nuevo 2026!</p>
        </motion.header>

        <div className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-2">
          {letters.map((letter, i) => (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className={`relative bg-white/60 backdrop-blur-sm border border-purple-200 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl overflow-hidden`}
              >
                <div className="absolute -top-3 right-5 opacity-80">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </div>

                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center border border-purple-100">
                      <Heart
                        className="w-5 h-5 text-purple-500"
                        fill="currentColor"
                      />
                    </div>
                    <h2 className="text-xl font-medium text-blue-900">
                      {letter.title}
                    </h2>
                  </div>
                  <p
                    className="text-blue-900/90 leading-relaxed text-base md:text-lg"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {letter.content}
                  </p>
                  <div className="flex justify-end mt-6">
                    <span className="text-purple-400 italic text-sm">
                      Con amor, tu Santicito
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimeBlock({
  value,
  label,
}: {
  readonly value: number;
  readonly label: string;
}) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-md border border-rose-200">
      <div className="text-2xl md:text-4xl font-bold text-rose-700 tabular-nums">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-xs md:text-sm text-rose-500 mt-1">{label}</div>
    </div>
  );
}
