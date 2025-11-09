import { cookies } from "next/headers";

// NOTE: we use a simple signed cookie substitute for now (base64 JSON).
// Users cannot change roles; HR controls accounts in DB.

export type Session = {
  userId: string;
  username: string;
  role: "STAFF" | "HR" | "BOD";
  status: "ACTIVE" | "DISABLED" | "SUSPENDED" | "TERMINATED";
};

export function setSessionCookie(s: Session) {
  cookies().set("eg_session", Buffer.from(JSON.stringify(s)).toString("base64"), {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });
}
export function clearSessionCookie() {
  cookies().set("eg_session", "", { path: "/", maxAge: 0 });
}
export function getSession(): Session | null {
  const v = cookies().get("eg_session")?.value;
  if (!v) return null;
  try { return JSON.parse(Buffer.from(v, "base64").toString()); } catch { return null; }
}
