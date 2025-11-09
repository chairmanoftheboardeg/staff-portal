export const metadata = {
  title: "EGR Staff Portal"
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ background: "#f5f5f5", margin: 0 }}>{children}</body>
    </html>
  );
}
