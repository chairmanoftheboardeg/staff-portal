import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/dashboard")) return NextResponse.next();

  const cookie = req.cookies.get("eg_session")?.value;
  if (!cookie) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    const session = JSON.parse(Buffer.from(cookie, "base64").toString());
    const role = session.role as "STAFF" | "HR" | "BOD";
    if (pathname.startsWith("/dashboard/staff") && role !== "STAFF")
      return NextResponse.redirect(new URL(`/dashboard/${role.toLowerCase()}`, req.url));
    if (pathname.startsWith("/dashboard/hr") && role !== "HR")
      return NextResponse.redirect(new URL(`/dashboard/${role.toLowerCase()}`, req.url));
    if (pathname.startsWith("/dashboard/bod") && role !== "BOD")
      return NextResponse.redirect(new URL(`/dashboard/${role.toLowerCase()}`, req.url));
    return NextResponse.next();
  } catch {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
export const config = { matcher: ["/dashboard/:path*"] };
