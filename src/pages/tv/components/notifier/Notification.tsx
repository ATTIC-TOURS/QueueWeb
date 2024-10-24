import { useEffect, useState } from "react";
import { useModalWrapper } from "../../../../hooks/useModalWrapper";
import { WaitingCallType } from "../../../../shared/types/tv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Notifier({ data }: { data: WaitingCallType[] | null }) {
  const { handleModalClick, close_modal } = useModalWrapper();

  const [details, setDetails] = useState<WaitingCallType>();

  useEffect(() => {
    if (data) {
      setDetails(data[0]);
    }
  }, [data]);

  return (
    <>
      <div
        className={`bg-blood-red text-white-wash shadow rounded h-5/6 w-3/4 my-6 mx-auto border-8 border-white-wash ${
          close_modal ? "close-modal-animation" : "modal-animation"
        }`}
        onClick={handleModalClick}
      >
        <div className="h-1/6 flex items-center justify-center shadow-lg w-full p-6 bg-blood-red">
          <h1 className="font-bold ext-white-wash text-[clamp(3rem,calc(1.5rem+3vw),5rem)] text-center">For Servicing</h1>
        </div>
        <div className="grid grid-cols-[1.4fr,0.2fr,1.4fr] h-5/6 px-3 max-xl:grid-cols-1">
          <div className="flex flex-col justify-center items-center h-full text-[clamp(2rem,calc(1rem+4vw),6rem)] overflow-hidden">
            <h1 className="font-bold text-center text-white pl-3">
              {details?.name}
            </h1>
            <h3 className="font-bold text-center">{details?.queue_code}</h3>
          </div>
          <div className="flex justify-center items-center h-full text-center text-[clamp(2rem,calc(1rem+9vw),16rem)]">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
          <div className="flex justify-center items-center h-full text-[clamp(2rem,calc(1rem+4vw),6rem)]">
            <h1 className="font-bold text-center">{details?.window_name}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
