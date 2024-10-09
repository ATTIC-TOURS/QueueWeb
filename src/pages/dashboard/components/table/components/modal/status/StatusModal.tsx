import { useModalWrapper } from "../../../../../../../hooks/useModalWrapper";
import { useViewableStatus } from "../../../../../../../hooks/useViewableStatus";

export default function StatusModal() {
  const { handleModalClick, close_modal } = useModalWrapper("Done");

  const { isViewableStatusLoading, viewableStatus } = useViewableStatus();

  if (isViewableStatusLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      onClick={handleModalClick}
      className={`bg-eggshell shadow rounded w-auto p-6 my-6 mx-auto max-w-3xl ${
        close_modal ? "close-modal-animation" : "modal-animation"
      }`}
    >
      <h1 className="text-center text-2xl font-medium mb-2">Select Status</h1>
      <form>
        {viewableStatus.map((status, index) => (
          <div className="pt-2 flex gap-2 " key={index}>
            <input type="radio" name={status} value={status} />
            <label htmlFor={status}>{status}</label>
          </div>
        ))}
        <button className="bg-blood-red text-white-wash font-semibold mt-5 rounded p-1 w-full">
          Done
        </button>
      </form>
    </div>
  );
}
