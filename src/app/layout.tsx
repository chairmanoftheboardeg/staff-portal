export const metadata = { title: "EGR Staff Portal" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body style={{background:"#f6f7f9"}}>{children}</body></html>
  );
}
