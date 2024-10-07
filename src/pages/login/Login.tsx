import { useState } from "react";
import DocumentTitle from "../../components/document-title/DocumentTitle";
import Branches from "./components/branches/Branches";
import Header from "./components/header/Header";
import { ModalContext } from "./shared/modal-ctx";
import PasswordModal from "./components/password/modal/Modal";

export default function Login() {
  const [is_modal_open, setIsModalOpen] = useState(false);
  const [modal_title, setModalTitle] = useState("");

  const modal_context = {
    modal_status: is_modal_open,
    setModalStatus: setIsModalOpen,
    modal_title: modal_title,
    setModalTitle: setModalTitle,
  };
  return (
    <>
      <ModalContext.Provider value={modal_context}>
        <DocumentTitle title="Login" />
        <Header />
        <Branches />
        {is_modal_open && <PasswordModal chosen_branch={modal_title} />}
      </ModalContext.Provider>
    </>
  );
}
