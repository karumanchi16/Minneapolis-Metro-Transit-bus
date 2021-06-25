export function ApiHelper(url, method) {
  return fetch(url, {
    method: method,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res);
}
