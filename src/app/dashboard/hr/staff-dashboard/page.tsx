"use client";
import { useEffect, useState } from "react";

type User = { id:string; username:string; name:string; department:string; role:"STAFF"|"HR"|"BOD"; status:"ACTIVE"|"DISABLED"|"SUSPENDED"|"TERMINATED" };

export default function StaffDb() {
  const [q,setQ]=useState(""); const [data,setData]=useState<User[]>([]);
  const load=async()=>{ const res=await fetch(`/api/hr/users?query=${encodeURIComponent(q)}`,{cache:"no-store"}); setData(await res.json()); };
  useEffect(()=>{ load(); },[]);
  return (
    <div style={{display:"grid", gap:12}}>
      <div style={{display:"flex", gap:8}}>
        <input placeholder="Search username/name/department" value={q} onChange={e=>setQ(e.target.value)} style={{flex:1, padding:10, border:"1px solid #ddd", borderRadius:10}} />
        <button onClick={load} style={{padding:"8px 12px", border:"1px solid #ddd", borderRadius:10}}>Search</button>
        {/* Next step: New User button (modal) */}
      </div>
      <div style={{background:"#fff", border:"1px solid #eee", borderRadius:14, overflow:"hidden"}}>
        <table style={{width:"100%", fontSize:14}}>
          <thead><tr style={{background:"#fafafa"}}><th style={{textAlign:"left", padding:10}}>Username</th><th style={{textAlign:"left", padding:10}}>Name</th><th style={{textAlign:"left", padding:10}}>Department</th><th style={{textAlign:"left", padding:10}}>Role</th><th style={{textAlign:"left", padding:10}}>Status</th><th style={{textAlign:"left", padding:10}}>Actions</th></tr></thead>
          <tbody>
            {data.map(u=>(
              <tr key={u.id} style={{borderTop:"1px solid #eee"}}>
                <td style={{padding:10}}>{u.username}</td>
                <td style={{padding:10}}>{u.name}</td>
                <td style={{padding:10}}>{u.department}</td>
                <td style={{padding:10}}>{u.role}</td>
                <td style={{padding:10}}>{u.status}</td>
                <td style={{padding:10}}>
                  {/* next step: Edit / Disable / Reset Password / Delete */}
                  <button style={{textDecoration:"underline", marginRight:8}}>Edit</button>
                  <button style={{textDecoration:"underline", color:"#c00"}}>Delete</button>
                </td>
              </tr>
            ))}
            {!data.length && <tr><td colSpan={6} style={{padding:10, color:"#777"}}>No results</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
