export const getUrl = () => {
  if (typeof window !== "undefined") return;

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `https://localhost:${process.env.PORT ?? 3000}`;
};
