import { getBaseUrl } from "../utils/base-url";

export const baseQuery = {
  credentials: "include" as RequestCredentials,
  header: {
    "Content-Type": "application/json",
  },
  baseUrl: getBaseUrl(
    `${import.meta.env.VITE_MODE === "development" ? "http" : "https"}`
  ),
};
