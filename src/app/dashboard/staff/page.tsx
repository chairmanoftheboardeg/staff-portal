import Shell from "@/components/Shell";

export default function Staff() {
  return (
    <Shell
      title="Staff Dashboard"
      left={<div style={{ background: "#fff", padding: 12 }}>My Schedule</div>}
      center={<div style={{ background: "#fff", padding: 12 }}>Tasks</div>}
      right={<div style={{ background: "#fff", padding: 12 }}>Agenda</div>}
    />
  );
}
