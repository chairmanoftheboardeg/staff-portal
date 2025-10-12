<!-- /js/users.js -->
<script>
// Hard-coded users (edit this list).
// password_hash is SHA-256 of the plain password (lowercase hex).
// Generate new hashes here: https://emn178.github.io/online-tools/sha256.html
// Example passwords below are: Staff123!, Admin123!

window.EGR_USERS = [
  {
    email: "tyler@egr",
    full_name: "Tyler Nicholas",
    department: "Executive Office",
    role: "Founder",
    is_admin: true,                 // Admin (HR + Exec) privileges
    avatar_url: "https://i.pravatar.cc/120?img=5",
    password_hash: "1b6bd8db18fd1d6a9ae82b9a9e8e3d8b1dc6b09732df1e7f7bbed1e8c4e2b88a" // Staff123!
  },
  {
    email: "kareem@egr",
    full_name: "Kareem Malhas",
    department: "Board",
    role: "Chairman",
    is_admin: true,
    avatar_url: "https://i.pravatar.cc/120?img=12",
    password_hash: "5ab1a8e4e9d0fbeb7bc1f9f64e16319a59ab5f20b14683d82a4a7f2c0c2d9b62" // Admin123!
  },
  {
    email: "remo@egr",
    full_name: "Remo Perissinotto",
    department: "HQ",
    role: "President & CEO",
    is_admin: true,
    avatar_url: "https://i.pravatar.cc/120?img=20",
    password_hash: "1b6bd8db18fd1d6a9ae82b9a9e8e3d8b1dc6b09732df1e7f7bbed1e8c4e2b88a" // Staff123!
  },
  {
    email: "ash@flydubai",
    full_name: "Ash",
    department: "Fly Dubai",
    role: "Chairwoman",
    is_admin: false,
    avatar_url: "https://i.pravatar.cc/120?img=30",
    password_hash: "1b6bd8db18fd1d6a9ae82b9a9e8e3d8b1dc6b09732df1e7f7bbed1e8c4e2b88a" // Staff123!
  }
];

// Session helpers (persist across pages)
window.EGR_AUTH = {
  async sha256(msg) {
    const enc = new TextEncoder().encode(msg);
    const buf = await crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
  },
  async login(email, password) {
    const u = (window.EGR_USERS || []).find(x => x.email.toLowerCase() === email.toLowerCase());
    if (!u) return { ok:false, error:"No such user" };
    const hash = await this.sha256(password);
    if (hash !== u.password_hash) return { ok:false, error:"Wrong password" };
    const profile = {
      email: u.email, full_name: u.full_name, department: u.department,
      role: u.role, is_admin: !!u.is_admin, avatar_url: u.avatar_url || ""
    };
    // Save to storage (use sessionStorage if you want session-only)
    localStorage.setItem("egr_profile", JSON.stringify(profile));
    localStorage.setItem("egr_logged_in", "1");
    return { ok:true, profile };
  },
  logout() {
    localStorage.removeItem("egr_profile");
    localStorage.removeItem("egr_logged_in");
  },
  me() {
    if (localStorage.getItem("egr_logged_in") !== "1") return null;
    try { return JSON.parse(localStorage.getItem("egr_profile") || "null"); }
    catch { return null; }
  }
};
</script>