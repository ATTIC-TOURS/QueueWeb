import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "../index.css";
import { HelmetProvider } from "react-helmet-async";
// import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <Provider> */}
      <HelmetProvider>
        <App />
      </HelmetProvider>
    {/* </Provider> */}
  </StrictMode>
);
