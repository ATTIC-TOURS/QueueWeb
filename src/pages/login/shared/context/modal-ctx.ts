import { createContext } from "react";

export const LoginModalContext = createContext<{
  modal_status: boolean;
  setModalStatus: (status: boolean) => void;
  modal_title: string;
  setModalTitle: (title: string) => void;
  branch_id: string;
  setBranchId: (id: string) => void;
}>({
  modal_status: false,
  setModalStatus: () => {},
  modal_title: "",
  setModalTitle: () => {},
  branch_id: "",
  setBranchId: () => {},
});
