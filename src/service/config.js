export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3100/api"
    : "https://nft-backend-17tx7lhzc-lismarygoyo.vercel.app/api";

export const IMG_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3100"
    : "https://nft-backend-17tx7lhzc-lismarygoyo.vercel.app/api";
