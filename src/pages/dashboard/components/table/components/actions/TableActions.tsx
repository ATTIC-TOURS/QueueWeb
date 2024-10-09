import { useDispatch } from "react-redux";
import { QueueTicketType } from "../../../../../../shared/types/queue-ticket";
import { AppDispatch } from "../../../../../../shared/stores/app";
import {
  IModalState,
  setModalStatus,
} from "../../../../../../shared/stores/modal";
import { setTicket } from "../../../../../../shared/stores/ticket";

export default function TableActions({ ticket }: { ticket: QueueTicketType }) {
  const dispatch = useDispatch<AppDispatch>();

  const handleCall = () => {
    const modal_status: IModalState = {
      active: true,
      modalFor: "Call",
    };
    dispatch(setModalStatus(modal_status));
    dispatch(setTicket(ticket));
  };

  const handleDone = () => {
    const modal_status: IModalState = {
      active: true,
      modalFor: "Done",
    };
    dispatch(setModalStatus(modal_status));
    dispatch(setTicket(ticket));
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
        className={`${
          !ticket.is_called
            ? "bg-rose-pink text-white w-20 py-1 rounded"
            : "bg-blood-red text-white-wash w-20 py-1 rounded"
        } md:mr-3 max-md:mb-3`}
        onClick={handleDone}
        disabled={!ticket.is_called}
      >
        Done
      </button>
    </>
  );
}
