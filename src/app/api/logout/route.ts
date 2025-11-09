import { clearSessionCookie } from "@/lib/session";

export async function POST() {
  clearSessionCookie();
  return new Response("OK");
}
