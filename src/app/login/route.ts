import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { setSessionCookie } from "@/lib/session";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (!username || !password) return new NextResponse("Missing", { status: 400 });

  const { rows } = await db`
    SELECT id, username, name, role, status, password_hash, department
    FROM users WHERE username = ${username}
    LIMIT 1
  `;
  const user = rows[0];
  if (!user) return new NextResponse("Invalid credentials", { status: 401 });
  if (user.status !== "ACTIVE") return new NextResponse("Account inactive. Contact HR.", { status: 401 });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return new NextResponse("Invalid credentials", { status: 401 });

  setSessionCookie({
    userId: user.id,
    username: user.username,
    role: user.role,
    status: user.status
  });

  return new NextResponse("ok");
}
