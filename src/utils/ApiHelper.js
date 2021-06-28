export const domain = "https://svc.metrotransit.org/nextripv2/";
export const GET = "GET";

export function apiHelper(url, method) {
  return fetch(domain + url, {
    method: method,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res);
}
