export const baseQuery = {
  credentials: "include" as RequestCredentials,
  header: {
    "Content-Type": "application/json",
  },
  baseUrl: `${import.meta.env.VITE_SERVER_BASE_URL}`,
};
