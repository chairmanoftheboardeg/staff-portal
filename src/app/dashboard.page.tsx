import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default function DashIndex() {
  const s = getSession();
  const role = s?.role ?? "STAFF";
  redirect(`/dashboard/${role.toLowerCase()}`);
}
