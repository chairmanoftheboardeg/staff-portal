<script>
window.EGR_API_URL = "https://script.google.com/macros/s/AKfycbxXrXoJjhYflH37MUF_drHP6MDqaGBv7FF3r0YvysaEqe5_OY1ayWAV4sJ4zy7T1P1Y/exec"; // paste your Apps Script URL

async function api(method, data={}) {
  const res = await fetch(`${window.EGR_API_URL}?origin=${encodeURIComponent(location.origin)}`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ method, ...data })
  });
  return res.json();
}

function saveToken(tok){ localStorage.setItem("egr_token", tok); }
function getToken(){ return localStorage.getItem("egr_token"); }
function clearToken(){ localStorage.removeItem("egr_token"); }
</script>

