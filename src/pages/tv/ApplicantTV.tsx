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
import { useEffect, useState } from "react";

import audio from "../../assets/audio/callingsound.mp3";

export default function ApplicantTV() {
  const { handleCloseModal } = useModalWrapper();

  const { called } = useCallWebSocket();

  const [show, setShow] = useState(false);

  const { playAudio } = useSoundNotify();

  useEffect(() => {
    if (called) {
      setShow(true);
      playAudio(called[0]);
    }

    return () => {
      setShow(false);
    };
  }, [called]);

  return (
    <>
    <audio id="audio" src={audio} autoPlay />
      <Helmet title="Applicant TV" />
      <div className="h-screen tv-bg">
        <div className="md:px-9">
          <img src={jvac_logo} alt="JVAC Logo" className="w-auto h-28" />
        </div>
        <div className=" grid grid-cols-[2fr,1fr] gap-3 px-2 xl:px-12 h-[calc(100vh-2rem)] md:h-[calc(100vh-11rem)] xl:h-[calc(100vh-11rem)] max-md:grid-cols-1">
          <div>
            <iframe
              className="w-full h-[90%] max-xl:h-[70%]"
              src="https://www.youtube.com/embed/watch?v=Bnej8INPYhw&list=PLvQ0G7tJfb3zqjWCxdQPrn9kCmmciLWUm&index=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
          <div>
            <InProgressQueue now_serving={called} />
          </div>
        </div>
        <ScrollingText />
      </div>
      <ModalWrapper onClick={handleCloseModal}>
        {show && <Notifier data={called} />}
      </ModalWrapper>
    </>
  );
}
