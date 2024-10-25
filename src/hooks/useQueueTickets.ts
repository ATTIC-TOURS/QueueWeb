import { useEffect, useState } from "react";
import { QueueTicketType } from "../shared/types/queue-ticket";
import { useWebSocket } from "./useWebSocket";

export function useQueueTickets() {
  const { ws } = useWebSocket({ type: "controller" });

  const [tickets, setTickets] = useState<QueueTicketType[]>();
  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (message) => {
      const parsed_data: QueueTicketType[] = JSON.parse(message.data);

      setTickets(parsed_data);
    };

    return () => {
      ws.close();
    };
  }, [ws]);

  return { tickets };
}
