import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IModalState, setModalStatus } from "../shared/stores/modal";
import { AppDispatch } from "../shared/stores/app";

export function useModalWrapper(title?: IModalState["modalFor"]) {
  const [close_modal, setCloseModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleCloseModal = () => {
    const modal_status: IModalState = {
      active: false,
      modalFor: title ?? null,
    };
    setTimeout(() => {
      dispatch(setModalStatus(modal_status));
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

  return { handleCloseModal, handleModalClick, close_modal };
}
