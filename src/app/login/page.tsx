"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });

    if (res.ok) window.location.href = "/dashboard";
    else alert("Invalid credentials or disabled account");
  }

  return (
    <div style={{ maxWidth: 400, margin: "120px auto" }}>
      <h2>Staff Login</h2>
      <form onSubmit={submit}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />
        <button style={{ width: "100%", padding: 10 }}>Login</button>
      </form>
    </div>
  );
}
