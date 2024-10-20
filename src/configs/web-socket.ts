import { getBaseUrl } from "../utils/base-url";

export const socket_base_url = getBaseUrl(
  `${import.meta.env.VITE_MODE === "development" ? "ws" : "wss"}`
);
