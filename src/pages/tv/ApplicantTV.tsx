import { Helmet } from "react-helmet-async";
import "./applicant-tv.css";

import InProgressQueue from "./components/in-prog/InProgressQueue";
import ScrollingText from "./components/marquee/ScrollingText";
import ModalWrapper from "../../components/wrapper/Wrapper";
import Notifier from "./components/notifier/Notification";
import { useModalWrapper } from "../../hooks/useModalWrapper";
import { useCallWebSocket } from "../../hooks/useCallWebSocket";
import { useSoundNotify } from "../../hooks/useSoundNotify";

import jvac_logo from "../../assets/images/jvac_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../shared/stores/app";
import { setModalStatus } from "../../shared/stores/modal";
import { useEffect } from "react";

export default function ApplicantTV() {
  const { handleCloseModal } = useModalWrapper();
  const { called } = useCallWebSocket();

  const { playAudio } = useSoundNotify();

  const modal_active = useSelector((state: IRootState) => state.modal.active);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (called) {
      playAudio(called);
      dispatch(setModalStatus({ active: true, modalFor: "Call" }));
    }
  }, [called]);
  return (
    <>
      <Helmet title="Applicant TV" />
      <div className="min-h-screen flex flex-col tv-bg">
        <div className="md:px-9">
          <img src={jvac_logo} alt="JVAC Logo" className="w-auto h-28" />
        </div>
        <main className=" flex flex-wrap justify-center gap-3 p-2 flex-grow max-sm:mb-24">
          <div className="flex-initial w-full xl:w-8/12">
            <iframe
              className="w-full h-[90%]"
              src="https://www.youtube.com/embed/videoseries?si=UKD7DsjKgPDjDx0b&amp;list=PLvf9VUdJeGeecJHhDmNzdbkhO2jm2kyqp&amp;loop=1&amp;controls=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
          <div className="flex-initial w-full xl:w-3/12">
            <InProgressQueue />
          </div>
        </main>
        <ScrollingText />
      </div>
      {modal_active && (
        <ModalWrapper onClick={handleCloseModal}>
          <Notifier details={called} />
        </ModalWrapper>
      )}
    </>
  );
}
