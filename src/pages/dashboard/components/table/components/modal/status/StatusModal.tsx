import { useModalWrapper } from "../../../../../../../hooks/useModalWrapper";

export default function StatusModal() {
  const { handleModalClick, close_modal } = useModalWrapper("Done");

  return (
    <div
      onClick={handleModalClick}
      className={`bg-eggshell shadow rounded w-auto p-6 my-6 mx-auto max-w-3xl ${
        close_modal ? "close-modal-animation" : "modal-animation"
      }`}
    >
      <h1 className="text-center text-2xl font-medium mb-2">Select Status</h1>
      <form>
        <div className="pt-2 flex gap-2 ">
          <input type="radio" name="complete" value="complete" />
          <label htmlFor="complete">Complete</label>
        </div>
        <div className="pt-2 flex gap-2 ">
          <input type="radio" name="pending" value="pending" />
          <label htmlFor="pending">Pending</label>
        </div>
        <div className="pt-2 flex gap-2 ">
          <input type="radio" name="cancel" value="cancel" />
          <label htmlFor="cancel">Cancel</label>
        </div>
        <button className="bg-blood-red text-white-wash font-semibold mt-5 rounded p-1 w-full">
          Done
        </button>
      </form>
    </div>
  );
}
