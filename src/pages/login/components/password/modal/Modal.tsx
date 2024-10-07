import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../shared/modal-ctx";
import "./modal.css";
import Wrapper from "../../../../../components/wrapper/Wrapper";
import PasswordForm from "../form/form";

export default function PasswordModal({
  chosen_branch,
}: {
  chosen_branch: string;
}) {
  const { setModalStatus } = useContext(ModalContext);
  const [close_modal, setCloseModal] = useState(false);

  const handleCloseModal = () => {
    console.log("handleCloseModal");
    setTimeout(() => {
      setModalStatus(false);
    }, 100);
    setCloseModal(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setCloseModal(false);
    }, 100);
  }, [close_modal]);

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

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
