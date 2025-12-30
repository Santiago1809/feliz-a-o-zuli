import { NextResponse } from "next/server";
import { addMessage, getMessages } from "@/lib/db";

export async function GET() {
  try {
    const msgs = getMessages(100);
    return NextResponse.json({ success: true, messages: msgs });
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
    const name = String(body.name || "Anonimo").slice(0, 100);
    const message = String(body.message || "").slice(0, 2000);
    if (!message.trim())
      return NextResponse.json(
        { success: false, error: "Empty message" },
        { status: 400 }
      );

    const id = addMessage(name, message);
    return NextResponse.json({ success: true, id });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
