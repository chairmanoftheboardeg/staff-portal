export default function Shell({
  title,
  left,
  center,
  right
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
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <h1 style={{ fontSize: 22 }}>{title}</h1>
          <form action="/api/logout" method="post">
            <button style={{ padding: "6px 12px", borderRadius: 10, border: "1px solid #ccc" }}>
              Logout
            </button>
          </form>
        </div>
      </header>

      <main
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: 16,
          display: "grid",
          gap: 16,
          gridTemplateColumns: "1fr 1fr 1fr"
        }}
      >
        <aside>{left}</aside>
        <section>{center}</section>
        <aside>{right}</aside>
      </main>
    </div>
  );
}
