export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3100/api"
    : "vercel";

export const IMG_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3100" : "vercel";
