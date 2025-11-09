import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function readSession(req: NextRequest) {
  const raw = req.cookies.get("eg_session")?.value;
  if (!raw) return null;
  try { return JSON.parse(atob(raw)); } catch { return null; }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/dashboard")) return NextResponse.next();

  const s = readSession(req);
  if (!s) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const role = s.role;

  if (pathname.startsWith("/dashboard/staff") && role !== "STAFF")
    return NextResponse.redirect(new URL(`/dashboard/${role.toLowerCase()}`, req.url));

  if (pathname.startsWith("/dashboard/hr") && role !== "HR")
    return NextResponse.redirect(new URL(`/dashboard/${role.toLowerCase()}`, req.url));

  if (pathname.startsWith("/dashboard/bod") && role !== "BOD")
    return NextResponse.redirect(new URL(`/dashboard/${role.toLowerCase()}`, req.url));

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };
