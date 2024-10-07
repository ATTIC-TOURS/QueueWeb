import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { router } from "./routes";

function App() {
  return (
    <>
      <Toaster expand position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
