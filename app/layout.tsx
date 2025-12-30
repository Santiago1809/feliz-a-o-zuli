import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Para mi Zulicita 💕",
  description: "Un mensaje especial para mi niña linda ❤️🥺",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`font-sans antialiased`}>
        <header className="w-full sticky top-0 z-10 bg-white/60 backdrop-blur-sm border-b border-purple-100">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold text-purple-700">
              Para mi Zulicita
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/" className="text-sm text-blue-700 hover:underline">
                Inicio
              </Link>
              <Link
                href="/guestbook"
                className="text-sm text-blue-700 hover:underline"
              >
                Guestbook
              </Link>
              <Link
                href="/quiz"
                className="text-sm text-blue-700 hover:underline"
              >
                Quiz
              </Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
