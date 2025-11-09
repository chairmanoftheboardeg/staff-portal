import Shell from "@/components/Shell";
import Link from "next/link";
export default function HR() {
  return (
    <Shell
      title="HR Dashboard"
      left={<div style={{background:"#fff", padding:12, borderRadius:14, border:"1px solid #eee"}}><b>Approvals</b><p>No pending</p></div>}
      center={<div style={{background:"#fff", padding:12, borderRadius:14, border:"1px solid #eee"}}><b>Staff Database</b><p>Go to <Link href="/dashboard/hr/staff-database" style={{textDecoration:"underline"}}>Staff Database</Link></p></div>}
      right={<div style={{background:"#fff", padding:12, borderRadius:14, border:"1px solid #eee"}}><b>Surveys</b><p>None</p></div>}
    />
  );
}
