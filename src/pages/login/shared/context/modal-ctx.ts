import { createContext } from "react";

export const LoginModalContext = createContext<{
  modal_status: boolean;
  setModalStatus: (status: boolean) => void;
}>({
  modal_status: false,
  setModalStatus: () => {},
});
