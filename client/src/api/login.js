export async function loginAPI(payload) {
  const res = await fetch("http://localhost:5500/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
  const json = await res.json();
  return json;
}
