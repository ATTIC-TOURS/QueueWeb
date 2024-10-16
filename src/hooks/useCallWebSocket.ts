import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../shared/stores/app";
import { WaitingCallType } from "../shared/types/tv";
import { useEffect, useState } from "react";
import { setModalStatus } from "../shared/stores/modal";

export function useCallWebSocket() {
  const branch_id = useSelector((state: IRootState) => state.branch.id);

  const [ws, setWs] = useState<WebSocket | null>(null);

  const [called, setCalled] = useState<WaitingCallType[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const socket = new WebSocket(
      `${
        import.meta.env.VITE_SERVER_WS_BASE_URL
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

      dispatch(setModalStatus({ active: true, modalFor: "in-progress" }));
    };
  }, [dispatch, ws]);

  return { called };
}
