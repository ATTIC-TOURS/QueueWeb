import { useSelector } from "react-redux";
import { useModalWrapper } from "../../../../../../../hooks/useModalWrapper";
import { useViewableStatus } from "../../../../../../../hooks/useViewableStatus";
import { IRootState } from "../../../../../../../shared/stores/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueueUpdateSchema } from "../../../../../../../shared/validators/queue-ticket";
import { QueueUpdateType } from "../../../../../../../shared/types/queue-ticket";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useQueueUpdateMutation } from "../../../../../shared/api/queue";

export default function StatusModal() {
  const { handleModalClick, close_modal } = useModalWrapper("Done");

  const { isViewableStatusLoading, viewableStatus } = useViewableStatus();

  const ticket = useSelector((state: IRootState) => state.ticket);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<QueueUpdateType>({
    resolver: zodResolver(QueueUpdateSchema),
  });

  const [$updateStatus] = useQueueUpdateMutation();

  useEffect(() => {
    if (ticket.id) {
      setValue("queue_id", ticket.id.toString());
    }
  }, [ticket.id, setValue]);

  const handleUpdateStatus: SubmitHandler<QueueUpdateType> = (data) => {
    $updateStatus(data);
    window.location.reload();
  };

  const handleError: SubmitErrorHandler<QueueUpdateType> = (errors) => {
    console.log(errors);
  };

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
      <form onSubmit={handleSubmit(handleUpdateStatus, handleError)}>
        {viewableStatus.map((status, index) => (
          <div className="pt-2 flex gap-2 " key={index}>
            <input
              type="radio"
              value={status.id}
              defaultChecked={status.id === ticket.status_id}
              {...register("status_id")}
            />
            <label htmlFor={status.name}>{status.name}</label>
            {
              <span className="text-xs text-red-500">
                {errors.status_id?.message}
              </span>
            }
          </div>
        ))}
        <button
          type="submit"
          className="bg-blood-red text-white-wash font-semibold mt-5 rounded p-1 w-full"
        >
          Done
        </button>
      </form>
    </div>
  );
}
