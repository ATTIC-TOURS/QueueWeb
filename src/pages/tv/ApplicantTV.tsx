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
import { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../shared/stores/app";

export default function ApplicantTV() {
  const { handleCloseModal } = useModalWrapper();

  const [show, setShow] = useState(false);

  const { called } = useCallWebSocket();

  const { playAudio } = useSoundNotify();

  const initial_mount = useRef(true);

  const called_tickets = useSelector(
    (state: IRootState) => state.called_tickets
  );

  useMemo(() => {
    if (initial_mount.current) {
      initial_mount.current = false;
    } else if (called_tickets && called_tickets.length > 0) {
      setShow(true);
      playAudio(called_tickets[0]);
    }
    return () => {
      setShow(false);
    };
  }, [called_tickets]);

  return (
    <>
      <Helmet title="Applicant TV" />
      <div className="h-screen tv-bg">
        <div className="md:px-9">
          <img src={jvac_logo} alt="JVAC Logo" className="w-auto h-28" />
        </div>
        <div className=" grid grid-cols-[2fr,1fr] gap-3 px-2 xl:px-12 h-[calc(100vh-2rem)] md:h-[calc(100vh-11rem)] xl:h-[calc(100vh-11rem)] max-md:grid-cols-1">
          <div>
            <iframe
              className="w-full h-[90%] max-xl:h-[70%]"
              src="https://www.youtube.com/embed/videoseries?si=UKD7DsjKgPDjDx0b&amp;list=PLvf9VUdJeGeecJHhDmNzdbkhO2jm2kyqp&amp;loop=1&amp;controls=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
          <div>
            <InProgressQueue now_serving={called_tickets} />
          </div>
        </div>
        <ScrollingText />
      </div>
      {show && (
        <ModalWrapper onClick={handleCloseModal}>
          <Notifier data={called_tickets} />
        </ModalWrapper>
      )}
    </>
  );
}
