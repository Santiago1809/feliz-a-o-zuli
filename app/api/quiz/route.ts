import { NextResponse } from "next/server";
import { addQuizAttempt, getQuizAttempts } from "@/lib/db";

export async function GET() {
  try {
    const attempts = getQuizAttempts(100);
    return NextResponse.json({ success: true, attempts });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const answers = Array.isArray(body.answers) ? body.answers : [];
    const score = Number(body.score || 0);
    const id = addQuizAttempt(answers, score);
    return NextResponse.json({ success: true, id });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
