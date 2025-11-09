import Shell from "@/components/Shell";

export default function BOD() {
  return (
    <Shell
      title="Board of Directors"
      left={<div style={{ background: "#fff", padding: 12 }}>Org Health</div>}
      center={<div style={{ background: "#fff", padding: 12 }}>Broadcasts</div>}
      right={<div style={{ background: "#fff", padding: 12 }}>Approvals</div>}
    />
  );
}
