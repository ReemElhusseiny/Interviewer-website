export const tokenProvider = async () => {
  const res = await fetch("/api/stream/token", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch Stream token");
  const { token } = await res.json();
  return token;
};