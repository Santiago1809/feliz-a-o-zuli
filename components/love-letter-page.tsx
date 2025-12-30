"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Clock, Sparkles } from "lucide-react"

// Fecha objetivo: 1 de enero de 2026 a las 00:00 hora Colombia (UTC-5)
const TARGET_DATE = new Date().getTime()

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
]

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function LoveLetterPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = TARGET_DATE - now

      if (difference <= 0) {
        setIsUnlocked(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      }
    }

    setTimeLeft(calculateTimeLeft())
    if (
      calculateTimeLeft().days === 0 &&
      calculateTimeLeft().hours === 0 &&
      calculateTimeLeft().minutes === 0 &&
      calculateTimeLeft().seconds === 0
    ) {
      setIsUnlocked(true)
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center">
        <Heart className="w-12 h-12 text-rose-400 animate-pulse" />
      </div>
    )
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8 relative">
            <Heart className="w-24 h-24 text-rose-400 mx-auto animate-pulse" fill="currentColor" />
            <Sparkles className="w-8 h-8 text-amber-400 absolute top-0 right-1/3 animate-bounce" />
            <Sparkles className="w-6 h-6 text-amber-400 absolute bottom-0 left-1/3 animate-bounce delay-150" />
          </div>

          <h1 className="text-3xl md:text-4xl font-serif text-rose-800 mb-4 text-balance">
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

          <div className="flex items-center justify-center gap-2 text-rose-400">
            <Heart className="w-4 h-4" fill="currentColor" />
            <span className="text-sm italic">Con todo mi amor...</span>
            <Heart className="w-4 h-4" fill="currentColor" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <Heart className="w-12 h-12 text-rose-500" fill="currentColor" />
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-rose-800 mb-2 text-balance">Para mi Zulicita</h1>
          <p className="text-rose-500 italic">¡Feliz Año Nuevo 2026!</p>
        </header>

        <div className="grid gap-10 md:gap-12 grid-cols-1 md:grid-cols-2">
          {letters.map((letter, index) => (
            <Card
              key={letter.id}
              className="relative bg-gradient-to-br from-white via-rose-50 to-pink-100 border-2 border-rose-200 shadow-2xl hover:scale-[1.025] hover:shadow-pink-200 transition-transform duration-300 rounded-3xl overflow-hidden group"
              style={{
                animation: `fadeInUp 0.7s cubic-bezier(.23,1.01,.32,1) ${index * 0.18}s both`,
              }}
            >
              <div className="absolute -top-4 right-6 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-7 h-7 text-amber-400 animate-spin-slow" />
              </div>
              <CardContent className="p-8 md:p-10 flex flex-col h-full font-[var(--love-font)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center shadow-inner border border-rose-200">
                    <Heart className="w-6 h-6 text-rose-500 animate-pulse" fill="currentColor" />
                  </div>
                  <h2 className="text-2xl font-bold text-rose-700 tracking-wide drop-shadow-sm font-[var(--love-font)]">{letter.title}</h2>
                </div>
                <p className="text-rose-900/90 leading-relaxed text-lg md:text-xl text-pretty font-[var(--love-font)]" style={{whiteSpace: 'pre-line'}}>{letter.content}</p>
                <div className="flex justify-end mt-8">
                  <span className="text-rose-400 italic text-sm font-[var(--love-font)]">Con amor, tu Javi</span>
                </div>
              </CardContent>
              <div className="absolute -bottom-4 left-6 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                <Heart className="w-7 h-7 text-rose-300 animate-bounce" fill="currentColor" />
              </div>
            </Card>
          ))}
        </div>

        <footer className="text-center mt-12 text-rose-400">
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-4 h-4" fill="currentColor" />
            <span className="italic">Te amo, mi corazón</span>
            <Heart className="w-4 h-4" fill="currentColor" />
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Montserrat:wght@400;700&display=swap');
        :root {
          --love-font: 'Dancing Script', cursive;
          --love-sans: 'Montserrat', sans-serif;
        }
        .font-\[var\(--love-font\)\] {
          font-family: var(--love-font), cursive !important;
        }
        .font-\[var\(--love-sans\)\] {
          font-family: var(--love-sans), sans-serif !important;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3.5s linear infinite;
        }
      `}</style>
    </div>
  )
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-md border border-rose-200">
      <div className="text-2xl md:text-4xl font-bold text-rose-700 tabular-nums">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-xs md:text-sm text-rose-500 mt-1">{label}</div>
    </div>
  )
}
