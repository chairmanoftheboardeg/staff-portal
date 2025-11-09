import Shell from "@/components/Shell";

export default function HR() {
  return (
    <Shell
      title="HR Dashboard"
      left={<div style={{ background: "#fff", padding: 12 }}>Approvals</div>}
      center={<div style={{ background: "#fff", padding: 12 }}>Staff Database</div>}
      right={<div style={{ background: "#fff", padding: 12 }}>Reports</div>}
    />
  );
}
