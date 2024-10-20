type IProtocol = "http" | "https" | "ws" | "wss";


export const getBaseUrl = (protocol: IProtocol) => {
  const hostname = window.location.hostname;

  if (hostname === "localhost") {
    return `${protocol}://${import.meta.env.VITE_SERVER_LOCALHOST_BASE_URL}`;
  } else if (hostname.startsWith("192.168.")) {
    return `${protocol}://${import.meta.env.VITE_SERVER_BASE_URL}`;
  } else {
    return "";
  }
};
