const endpoint = "http://localhost:5000/books";
export async function getBooksAPI(accessToken) {
  const res = await fetch(endpoint, {
    method: "GET",
    headers: { authorization: `Bearer ${accessToken}` },
  });
  const json = await res.json();
  return json;
}
