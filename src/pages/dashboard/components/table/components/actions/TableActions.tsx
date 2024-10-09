import { useDispatch } from "react-redux";
import { QueueTicketType } from "../../../../../../shared/types/queue-ticket";
import { AppDispatch } from "../../../../../../shared/stores/app";
import {
  IModalState,
  setModalStatus,
} from "../../../../../../shared/stores/modal";

export default function TableActions({ ticket }: { ticket: QueueTicketType }) {
  const dispatch = useDispatch<AppDispatch>();

  const handleCall = () => {
    const modal_status: IModalState = {
      active: true,
      modalFor: "Call",
    };
    dispatch(setModalStatus(modal_status));
  };

  const handleDone = () => {
    const modal_status: IModalState = {
      active: true,
      modalFor: "Done",
    };
    dispatch(setModalStatus(modal_status));
  };

  return (
    <>
      <button
        className="bg-blue-ribbon text-white w-20 py-1 rounded md:mr-3 max-md:mb-3"
        onClick={handleCall}
      >
        Call
      </button>
      <button
        className="bg-blood-red text-white w-20 py-1 rounded"
        onClick={handleDone}
      >
        Done
      </button>
    </>
  );
}
