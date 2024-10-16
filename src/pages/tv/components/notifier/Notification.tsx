import { useEffect, useState } from "react";
import { useModalWrapper } from "../../../../hooks/useModalWrapper";
import { AppDispatch } from "../../../../shared/stores/app";
import { useDispatch } from "react-redux";
import { setModalStatus } from "../../../../shared/stores/modal";
import { WaitingCallType } from "../../../../shared/types/tv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Notifier({ data }: { data: WaitingCallType[] | null }) {
  const { handleModalClick, close_modal } = useModalWrapper();

  const dispatch = useDispatch<AppDispatch>();

  const [details, setDetails] = useState<WaitingCallType>();

  useEffect(() => {
    if (data) {
      setDetails(data[0]);

      const timer = setTimeout(() => {
        dispatch(setModalStatus({ active: false, modalFor: "in-progress" }));
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [data]);

  return (
    <>
      <div
        className={`bg-blood-red text-white-wash shadow rounded w-3/4 h-4/5 my-6 mx-auto border-8 border-white-wash ${
          close_modal ? "close-modal-animation" : "modal-animation"
        }`}
        onClick={handleModalClick}
      >
        <div className="text-white-wash text-9xl text-center shadow-lg w-full p-6 bg-blood-red">
          CALLING!
        </div>
        <div className="flex justify-around items-center h-3/4">
          <div className="px-2">
            <h1 className="pb-6 font-bold text-center text-9xl max-xl-1:text-5xl text-white">
              {details?.name}
            </h1>
            <h3 className="font-bold text-center text-9xl max-xl-1:text-5xl">
              {details?.queue_code}
            </h3>
          </div>
          <div>
            <FontAwesomeIcon icon={faArrowRight} className="text-9xl" />
          </div>
          <div>
            <h1 className="font-bold text-center text-9xl max-xl-1:text-5xl">
              {details?.window_name}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
