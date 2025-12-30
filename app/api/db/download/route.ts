import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { DB_PATH as _DB_PATH } from "@/lib/db";

// Reads DB_DOWNLOAD_KEY from env. If set, request must include header `x-db-key: <key>`
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const keyHeader = req.headers.get("x-db-key") || url.searchParams.get("key");
    const configured = process.env.DB_DOWNLOAD_KEY;

    if (configured && configured !== keyHeader) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const dbPath = _DB_PATH;
    if (!dbPath || !fs.existsSync(dbPath)) {
      return NextResponse.json({ success: false, error: "Database file not found" }, { status: 404 });
    }

    const file = await fs.promises.readFile(dbPath);
    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": "application/x-sqlite3",
        "Content-Disposition": `attachment; filename="${path.basename(dbPath)}"`,
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
