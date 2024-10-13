import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../shared/stores/app";
import { WaitingCallType } from "../shared/types/tv";
import { useEffect, useState } from "react";
import { useQueueTickets } from "./useQueueTickets";
import { QueueTicketType } from "../shared/types/queue-ticket";
import { setModalStatus } from "../shared/stores/modal";

export function useCallWebSocket() {
  const branch_id = useSelector((state: IRootState) => state.branch.id);

  const [ws, setWs] = useState<WebSocket | null>(null);

  const { waiting_tickets } = useQueueTickets();

  const [waiting_call, setWaitingCall] = useState<QueueTicketType[] | null>(
    null
  );
  const [in_progress_call, setInProgressCall] = useState<
    QueueTicketType[] | null
  >(null);

  const [called, setCalled] = useState<WaitingCallType | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const socket = new WebSocket(
      `ws://127.0.0.1:8000/current_queues/call/${branch_id}/`
    );

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [branch_id]);

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (message) => {
      if (!waiting_tickets) return;

      const parsed_data: WaitingCallType = JSON.parse(message.data);
      const new_list = waiting_tickets.filter(
        (ticket) => ticket.queue_no !== parsed_data.queue_no
      );

      setWaitingCall(new_list);
    };
  }, [waiting_call, waiting_tickets, ws]);

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (message) => {
      if (!waiting_tickets) return;

      const parsed_data: WaitingCallType = JSON.parse(message.data);
      console.log(parsed_data, "parsed_data");
      const new_list = waiting_tickets.filter(
        (ticket) => ticket.queue_no === parsed_data.queue_no
      );

      setInProgressCall(new_list);

      setCalled(parsed_data);

      dispatch(setModalStatus({ active: true, modalFor: "in-progress" }));
    };
  }, [dispatch, in_progress_call, waiting_tickets, ws]);

  return { waiting_call, in_progress_call, called };
}
