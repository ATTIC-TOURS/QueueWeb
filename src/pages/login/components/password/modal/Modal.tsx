import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Wrapper from "../../../../../components/wrapper/Wrapper";
import PasswordForm from "../form/form";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../../shared/stores/app";
import { useModalWrapper } from "../../../../../hooks/useModalWrapper";

export default function PasswordModal() {
  const { handleCloseModal, close_modal, handleModalClick } = useModalWrapper("Login");

  const chosen_branch = useSelector((state: IRootState) => state.branch.name);

  return (
    <>
      <Wrapper onClick={handleCloseModal}>
        <div
          className={`bg-eggshell shadow rounded w-auto p-3 my-6 mx-auto max-w-3xl ${
            close_modal ? "close-modal-animation" : "modal-animation"
          }`}
          onClick={handleModalClick}
        >
          {/* Modal Title */}
          <div className="flex justify-between">
            <h1 className="text-onyx text-lg font-bold">{chosen_branch}</h1>
            <FontAwesomeIcon
              icon={faTimes}
              color="var(--charcoal)"
              className="text-2xl cursor-pointer"
              onClick={handleCloseModal}
            />
          </div>
          {/* Form */}
          <div className="flex flex-col w-full p-1 outline-none focus:outline-none">
            <PasswordForm />
          </div>
        </div>
      </Wrapper>
    </>
  );
}
