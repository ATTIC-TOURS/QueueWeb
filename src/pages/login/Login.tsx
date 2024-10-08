import { useState } from "react";
import Branches from "./components/branches/Branches";
import Header from "./components/header/Header";
import { LoginModalContext } from "./shared/context/modal-ctx";
import PasswordModal from "./components/password/modal/Modal";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const [is_modal_open, setIsModalOpen] = useState(false);

  const modal_context = {
    modal_status: is_modal_open,
    setModalStatus: setIsModalOpen,
  };
  return (
    <>
      <LoginModalContext.Provider value={modal_context}>
        <Helmet title="Login" />
        <header>
          <Header />
        </header>
        <Branches />
        {is_modal_open && <PasswordModal />}
      </LoginModalContext.Provider>
    </>
  );
}
