import { useSelector } from "react-redux";
import { IRootState } from "../../shared/stores/app";
import Branches from "./components/branches/Branches";
import Header from "./components/header/Header";
import PasswordModal from "./components/password/modal/Modal";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const modal_for = useSelector((state: IRootState) => state.modal.modalFor);
  return (
    <>
      <Helmet title="Login" />
      <header>
        <Header />
      </header>
      <Branches />
      {modal_for === "Login" && <PasswordModal />}
    </>
  );
}
