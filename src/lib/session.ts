import { cookies } from "next/headers";

export type Session = {
  userId: string;
  username: string;
  role: "STAFF" | "HR" | "BOD";
  status: "ACTIVE" | "DISABLED" | "SUSPENDED" | "TERMINATED";
};

export function setSessionCookie(s: Session) {
  cookies().set("eg_session", btoa(JSON.stringify(s)), {
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
  try { return JSON.parse(atob(v)); } catch { return null; }
}
