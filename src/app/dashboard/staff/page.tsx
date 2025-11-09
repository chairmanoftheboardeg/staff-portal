import Shell from "@/components/Shell";
export default function Staff() {
  return (
    <Shell
      title="Staff Dashboard"
      left={<div style={{background:"#fff", padding:12, borderRadius:14, border:"1px solid #eee"}}><b>My Schedule (Today)</b><ul><li>08:00 Shift A</li><li>14:00 Training Brief</li></ul></div>}
      center={<div style={{background:"#fff", padding:12, borderRadius:14, border:"1px solid #eee"}}><b>Work to do</b><ul><li>Acknowledge SOP</li><li>Complete quiz</li></ul></div>}
      right={<div style={{background:"#fff", padding:12, borderRadius:14, border:"1px solid #eee"}}><b>Agenda</b><ul><li>Nov 28 — Safety Brief</li><li>Dec 8 — Event</li></ul></div>}
    />
  );
}
