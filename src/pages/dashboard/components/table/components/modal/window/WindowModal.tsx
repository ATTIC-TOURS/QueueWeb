import { useDispatch, useSelector } from "react-redux";
import { useModalWrapper } from "../../../../../../../hooks/useModalWrapper";
import { useWindows } from "../../../../../../../hooks/useWindows";
import {
  AppDispatch,
  IRootState,
} from "../../../../../../../shared/stores/app";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueueCallSchema } from "../../../../../../../shared/validators/queue-ticket";
import { QueueCallType } from "../../../../../../../shared/types/queue-ticket";
import { useEffect } from "react";
import { useQueueCallMutation } from "../../../../../shared/api/queue";
import { setModalStatus } from "../../../../../../../shared/stores/modal";
import { toast } from "sonner";
import { useQueueTickets } from "../../../../../../../hooks/useQueueTickets";

export default function WindowModal() {
  const { handleModalClick, close_modal } = useModalWrapper("Call");

  const { windows, windows_name, isWindowLoading } = useWindows();

  const { refetch } = useQueueTickets();

  const ticket = useSelector((state: IRootState) => state.ticket);

  const branch_id = useSelector((state: IRootState) => state.branch.id);

  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<QueueCallType>({
    resolver: zodResolver(QueueCallSchema),
  });

  const [$queueCall] = useQueueCallMutation();

  const handleCall: SubmitHandler<QueueCallType> = async (data) => {
    await $queueCall({ ...data, branch_id: branch_id ?? "" });

    dispatch(setModalStatus({ active: false, modalFor: "Call" }));
    toast.success(`Calling ticket ${ticket.queue_no} `);

    refetch();
  };

  const handleError: SubmitErrorHandler<QueueCallType> = (errors) => {
    console.log(errors);
  };

  useEffect(() => {
    if (ticket.id) {
      setValue("queue_id", ticket.id.toString());
    }
  }, [ticket.id, setValue]);

  return (
    <div
      onClick={handleModalClick}
      className={`bg-eggshell shadow rounded w-auto p-3 my-6 mx-auto max-w-3xl ${
        close_modal ? "close-modal-animation" : "modal-animation"
      }`}
    >
      <h1 className="text-center text-2xl font-medium">Select Window</h1>
      <form
        onSubmit={handleSubmit(handleCall, handleError)}
        className="grid p-6"
      >
        <select className="bg-white-wash p-2" {...register("window_id")}>
          <option>
            {ticket.window_id ? "Change window" : "Select window"}
          </option>
          {ticket.window_id && (
            <option value={ticket.window_id}>
              {windows_name(ticket.window_id)}
            </option>
          )}
          {isWindowLoading ? (
            <option>Loading windows...</option>
          ) : (
            windows
              .filter((item) => item.id !== ticket.window_id)
              .map((window, index) => (
                <option key={index} value={window.id}>
                  {window.name}
                </option>
              ))
          )}
        </select>
        {errors.window_id && (
          <p className="text-red-500 text-xs italic">
            {errors.window_id.message}
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-ribbon text-white-wash font-semibold mt-5 rounded p-1"
        >
          Call
        </button>
      </form>
    </div>
  );
}
