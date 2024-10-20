type AuthSession = {
  id: string;
  auth: boolean;
};

export function useAuthSession() {
  const session = sessionStorage.getItem("auth_session");

  const auth: AuthSession = JSON.parse(session || "false");

  return auth;
}
