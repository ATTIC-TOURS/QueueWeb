export const getBaseUrl = () => {
  const hostname = window.location.hostname;

  if (hostname === "localhost") {
    return `${import.meta.env.VITE_SERVER_LOCALHOST_BASE_URL}`;
  } else if (hostname.startsWith("192.168.")) {
    return `${import.meta.env.VITE_SERVER_BASE_URL}`;
  } else {
    return "";
  }
};
