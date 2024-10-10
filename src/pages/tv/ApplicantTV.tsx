import { Helmet } from "react-helmet-async";
import "./applicant-tv.css";

import AtticVideo from "./components/video/AtticVideo";
import InProgressQueue from "./components/in-prog/InProgressQueue";
import ScrollingText from "./components/marquee/ScrollingText";
import WaitingQueue from "./components/waiting/WaitingQueue";
import ModalWrapper from "../../components/wrapper/Wrapper";
import Notifier from "./components/notifier/Notification";
import { useModalWrapper } from "../../hooks/useModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { IModalState, setModalStatus } from "../../shared/stores/modal";
import { AppDispatch } from "../../shared/stores/app";
import { useLayoutEffect } from "react";

export default function ApplicantTV() {
  const current_view = window.location.href.split("/")[3] as
    | "waiting"
    | "in-progress";

  const modal_for = useSelector((state: IModalState) => state.modalFor);

  console.log(modal_for);

  const { handleCloseModal } = useModalWrapper();

  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    const modal_status: IModalState = { active: true, modalFor: "waiting" };
    dispatch(setModalStatus(modal_status));
  }, [dispatch]);

  return (
    <>
      <Helmet title="Applicant TV" />
      <div className="h-screen tv-bg">
        <div className="tv-screen h-full">
          <AtticVideo />
          {current_view === "waiting" ? <WaitingQueue /> : <InProgressQueue />}
          <ScrollingText />
        </div>
      </div>
      <ModalWrapper onClick={handleCloseModal}>
        {<Notifier title={current_view} />}
      </ModalWrapper>
    </>
  );
}
