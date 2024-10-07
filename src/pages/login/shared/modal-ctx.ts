import { createContext } from "react";

export const ModalContext = createContext<{
  modal_status: boolean;
  setModalStatus: (status: boolean) => void;
  modal_title: string;
  setModalTitle: (title: string) => void;
}>({
  modal_status: false,
  setModalStatus: () => {},
  modal_title: "",
  setModalTitle: () => {},
});
