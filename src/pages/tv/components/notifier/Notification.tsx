import { useModalWrapper } from "../../../../hooks/useModalWrapper";
import Applied from "./content/apply/Applied";
import Called from "./content/call/Called";

export default function Notifier({
  title,
}: {
  title: "waiting" | "in-progress";
}) {
  const { handleModalClick, close_modal } = useModalWrapper(title);

  return (
    <>
      <div
        className={`bg-blood-red text-white-wash shadow rounded w-3/4 h-4/5 p-3 my-6 mx-auto flex flex-col justify-center items-center ${
          close_modal ? "close-modal-animation" : "modal-animation"
        }`}
        onClick={handleModalClick}
      >
        {/* <Applied /> */}
        <Called />
      </div>
    </>
  );
}
