import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function readSession(req: NextRequest) {
  const raw = req.cookies.get("eg_session")?.value;
  if (!raw) return null;
  try {
    // Edge runtime: use atob to decode base64, then JSON.parse
    const json = atob(raw);
    return JSON.parse(json) as {
      role: "STAFF" | "HR" | "BOD";
      status: "ACTIVE" | "DISABLED" | "SUSPENDED" | "TERMINATED";
      userId: string;
      username: string;
    };
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const session = readSession(req);
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const role = session.role;

  // route guard by role
  if (pathname.startsWith("/dashboard/staff") && role !== "STAFF") {
    return NextResponse.redirect(new URL(`/dashboard/${role.toLowerCase()}`, req.url));
  }
  if (pathname.startsWith("/dashboard/hr") && role !== "HR") {
    return NextResponse.redirect(new URL(`/dashboard/${role.toLowerCase()}`, req.url));
  }
  if (pathname.startsWith("/dashboard/bod") && role !== "BOD") {
    return NextResponse.redirect(new URL(`/dashboard/${role.toLowerCase()}`, req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };
