import Shell from "@/components/Shell";
export default function BOD() {
  return (
    <Shell
      title="Board of Directors"
      left={<div style={{background:"#fff", padding:12, borderRadius:14, border:"1px solid #eee"}}><b>Org Health</b><ul><li>Headcount: —</li></ul></div>}
      center={<div style={{background:"#fff", padding:12, borderRadius:14, border:"1px solid #eee"}}><b>Broadcasts</b><p>(coming soon)</p></div>}
      right={<div style={{background:"#fff", padding:12, borderRadius:14, border:"1px solid #eee"}}><b>Approvals</b><p>None</p></div>}
    />
  );
}
