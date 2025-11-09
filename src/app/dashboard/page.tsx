import { getSession } from "@/lib/session";

export default function DashboardRoot() {
  const s = getSession();
  if (!s) return null;
  return <meta http-equiv="refresh" content={`0;URL=/dashboard/${s.role.toLowerCase()}`} />;
}
