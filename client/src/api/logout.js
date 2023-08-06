export async function logoutAPI() {
  const refreshToken = localStorage.getItem("refreshToken");
  const res = await fetch("http://localhost:5500/logout", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });
  const json = await res.json();
  return json;
}
