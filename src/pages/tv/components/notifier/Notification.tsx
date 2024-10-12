import { useLatestTicket } from "../../../../hooks/useLatestTicket";
import { useModalWrapper } from "../../../../hooks/useModalWrapper";
import { useWindows } from "../../../../hooks/useWindows";
import Called from "./content/call/Called";

export default function Notifier() {
  const { handleModalClick, close_modal } = useModalWrapper("waiting");

  const { latest_ticket } = useLatestTicket();

  const { windows_name } = useWindows();

  console.log(latest_ticket, "!!!!!!!");
  return (
    <>
      <div
        className={`bg-blood-red text-white-wash shadow rounded w-3/4 h-4/5 p-3 my-6 mx-auto flex flex-col justify-center items-center ${
          close_modal ? "close-modal-animation" : "modal-animation"
        }`}
        onClick={handleModalClick}
      >
        <h1 className="text-9xl pb-6">
          {windows_name(latest_ticket?.window_id ?? "")}
        </h1>
        <h3 className="text-9xl font-bold">{latest_ticket?.queue_no}</h3>
      </div>
    </>
  );
}
