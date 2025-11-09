import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET(req: Request) {
  const s = getSession();
  if (!s || (s.role !== "HR" && s.role !== "BOD")) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  const q = new URL(req.url).searchParams.get("query") ?? "";
  const { rows } = await db`
    SELECT id, username, name, department, role, status
    FROM users
    WHERE username ILIKE ${'%' + q + '%'}
       OR name ILIKE ${'%' + q + '%'}
       OR department ILIKE ${'%' + q + '%'}
    ORDER BY created_at DESC
    LIMIT 100
  `;
  return NextResponse.json(rows);
}
