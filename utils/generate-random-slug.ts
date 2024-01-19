export const generateRandomSlug = () => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
  const len = 6;
  let shortUrl = "";

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    shortUrl += charset[randomIndex];
  }
  return shortUrl;
};
