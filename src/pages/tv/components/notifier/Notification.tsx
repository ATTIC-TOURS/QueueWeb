import { useEffect } from "react";
import { useModalWrapper } from "../../../../hooks/useModalWrapper";
import { AppDispatch } from "../../../../shared/stores/app";
import { useDispatch } from "react-redux";
import { setModalStatus } from "../../../../shared/stores/modal";
import { WaitingCallType } from "../../../../shared/types/tv";

export default function Notifier({ data }: { data: WaitingCallType | null }) {
  const { handleModalClick, close_modal } = useModalWrapper("waiting");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        dispatch(setModalStatus({ active: false, modalFor: "in-progress" }));
        window.location.reload();
      }, 3000);
    }
  }, [data, dispatch]);

  return (
    <>
      <div
        className={`bg-blood-red text-white-wash shadow rounded w-3/4 h-4/5 p-3 my-6 mx-auto flex flex-col justify-center items-center ${
          close_modal ? "close-modal-animation" : "modal-animation"
        }`}
        onClick={handleModalClick}
      >
        <h1 className="pb-6 font-bold text-center text-9xl max-xl-1:text-5xl">
          {data && data?.window}
        </h1>
        <h3 className="font-bold text-center text-9xl max-xl-1:text-5xl">
          {data && data?.queue_no}
        </h3>
      </div>
    </>
  );
}
