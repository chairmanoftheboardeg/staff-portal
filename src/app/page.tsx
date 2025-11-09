import Link from "next/link";
export default function Home() {
  return (
    <main style={{minHeight:"100dvh", display:"grid", placeItems:"center"}}>
      <Link href="/login" style={{textDecoration:"underline"}}>Go to Login</Link>
    </main>
  );
}
