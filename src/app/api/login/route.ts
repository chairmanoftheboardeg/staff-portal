import { db } from "@/lib/db";
import { setSessionCookie } from "@/lib/session";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const { rows } = await db`
    SELECT * FROM users WHERE username = ${username} LIMIT 1
  `;
  const user = rows[0];

  if (!user) return new Response("Invalid", { status: 401 });
  if (user.status !== "ACTIVE") return new Response("Disabled", { status: 403 });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return new Response("Invalid", { status: 401 });

  setSessionCookie({
    userId: user.id,
    username: user.username,
    role: user.role,
    status: user.status
  });

  return new Response("OK");
}
