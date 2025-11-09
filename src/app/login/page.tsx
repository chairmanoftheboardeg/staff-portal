"use client";
import { useState } from "react";

export default function Login() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
    if (res.ok) window.location.href = "/dashboard";
    else setErr(await res.text());
  };

  return (
    <div style={{minHeight:"100dvh", display:"grid", placeItems:"center", background:"#f6f7f9"}}>
      <form onSubmit={submit} style={{width:360, background:"#fff", padding:24, borderRadius:16, boxShadow:"0 1px 4px rgba(0,0,0,.06)"}}>
        <h1 style={{fontSize:20, fontWeight:600, marginBottom:12}}>Staff Portal Login</h1>
        <label>Username</label>
        <input value={username} onChange={e=>setU(e.target.value)} style={{width:"100%", padding:10, border:"1px solid #ddd", borderRadius:10, marginTop:6, marginBottom:10}} />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setP(e.target.value)} style={{width:"100%", padding:10, border:"1px solid #ddd", borderRadius:10, marginTop:6}} />
        {err && <div style={{color:"#c00", fontSize:12, marginTop:8}}>{err}</div>}
        <button style={{marginTop:14, width:"100%", padding:10, background:"#000", color:"#fff", borderRadius:12}}>Sign in</button>
        <p style={{fontSize:12, color:"#666", marginTop:10}}>Forgot password? <b>Contact HR</b>. You cannot change your own info.</p>
      </form>
    </div>
  );
}
