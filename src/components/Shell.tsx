export default function Shell({
  title,
  left,
  center,
  right,
}: {
  title: string;
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div>
      <header style={{ background: "#fff", borderBottom: "1px solid #eee" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "10px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontWeight: 600 }}>{title}</h1>
          <form action="/api/logout" method="post">
            <button style={{ padding: "6px 10px", border: "1px solid #ddd", borderRadius: 10 }}>
              Logout
            </button>
          </form>
        </div>
      </header>

      <main
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "16px",
          display: "grid",
          gap: 16,
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        <aside>{left}</aside>
        <section>{center}</section>
        <aside>{right}</aside>
      </main>
    </div>
  );
}
