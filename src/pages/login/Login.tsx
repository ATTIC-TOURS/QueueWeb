import { useState } from "react";
import Branches from "./components/branches/Branches";
import Header from "./components/header/Header";
import { LoginModalContext } from "./shared/context/modal-ctx";
import PasswordModal from "./components/password/modal/Modal";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const [is_modal_open, setIsModalOpen] = useState(false);
  const [modal_title, setModalTitle] = useState("");
  const [branch_id, setBranchId] = useState("");

  const modal_context = {
    modal_status: is_modal_open,
    setModalStatus: setIsModalOpen,
    modal_title: modal_title,
    setModalTitle: setModalTitle,
    branch_id: branch_id,
    setBranchId: setBranchId,
  };
  return (
    <>
      <LoginModalContext.Provider value={modal_context}>
        <Helmet title="Login" />
        <Header />
        <Branches />
        {is_modal_open && <PasswordModal chosen_branch={modal_title} />}
      </LoginModalContext.Provider>
    </>
  );
}
