import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../shared/stores/app";
import { WaitingCallType } from "../shared/types/tv";
import { useEffect, useState } from "react";
import { setCalledTickets } from "../shared/stores/called-ticket";
import { socket_base_url } from "../configs/web-socket";
import { useAuthSession } from "./useAuthSession";

export function useCallWebSocket() {
  const branch_id = useSelector((state: IRootState) => state.branch.id);

  const [ws, setWs] = useState<WebSocket | null>(null);

  const [called, setCalled] = useState<WaitingCallType[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const done_tickets = useSelector((state: IRootState) => state.done_tickets);

  const user_id = useAuthSession().id;

  useEffect(() => {
    const socket = new WebSocket(
      `${
        socket_base_url
      }/current_queues/call/${branch_id}/`
    );

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [branch_id]);

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (message) => {
      const parsed_data: WaitingCallType = JSON.parse(message.data);

      setCalled((prev) => {
        const data = prev.filter(
          (item) => item.queue_code !== parsed_data.queue_code
        );
        return [parsed_data, ...data];
      });

      dispatch(setCalledTickets(parsed_data));

    };
  }, [dispatch, done_tickets, user_id, ws]);

  return { called };
}
