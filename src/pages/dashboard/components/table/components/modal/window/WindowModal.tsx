import { useModalWrapper } from "../../../../../../../hooks/useModalWrapper";
import { useWindows } from "../../../../../../../hooks/useWindows";

export default function WindowModal() {
  const { handleModalClick, close_modal } = useModalWrapper("Call");

  const { windows, isWindowLoading } = useWindows();

  return (
    <div
      onClick={handleModalClick}
      className={`bg-eggshell shadow rounded w-auto p-3 my-6 mx-auto max-w-3xl ${
        close_modal ? "close-modal-animation" : "modal-animation"
      }`}
    >
      <h1 className="text-center text-2xl font-medium">Select Window</h1>
      <form className="grid p-6">
        <select name="queue_window" className="bg-white-wash p-2">
          {isWindowLoading ? (
            <option>Loading windows...</option>
          ) : (
            windows.map((window, index) => (
              <option key={index} value={window.id}>
                {window.name}
              </option>
            ))
          )}
        </select>
        <button className="bg-blue-ribbon text-white-wash font-semibold mt-5 rounded p-1">Call</button>
      </form>
    </div>
  );
}
