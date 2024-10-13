import { Helmet } from "react-helmet-async";
import "./applicant-tv.css";

import AtticVideo from "./components/video/AtticVideo";
import InProgressQueue from "./components/in-prog/InProgressQueue";
import ScrollingText from "./components/marquee/ScrollingText";
import WaitingQueue from "./components/waiting/WaitingQueue";
import ModalWrapper from "../../components/wrapper/Wrapper";
import Notifier from "./components/notifier/Notification";
import { useModalWrapper } from "../../hooks/useModalWrapper";
import { useCallWebSocket } from "../../hooks/useCallWebSocket";
import { useSoundNotify } from "../../hooks/useSoundNotify";

export default function ApplicantTV() {
  const current_view = window.location.href.split("/")[3] as
    | "waiting"
    | "in-progress";

  const { handleCloseModal } = useModalWrapper();

  const { in_progress_call, called } = useCallWebSocket();

  const { speak } = useSoundNotify();

  setTimeout(() => {
    if (called) {
      console.log("called", called);
      speak(called);
    }
  }, 2500);

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
        {in_progress_call && in_progress_call.length > 0 && (
          <Notifier data={called} />
        )}
      </ModalWrapper>
    </>
  );
}
