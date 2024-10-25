import { useEffect, useState } from "react";
import { useWebSocket } from "./useWebSocket";
import { CurrentStatusType } from "../shared/types/queue-ticket";

export function useCurrentStatus() {
  const { ws } = useWebSocket({ type: "stats" });

  const [stats, setStats] = useState<CurrentStatusType>();
  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (message) => {
      const parsed_data: CurrentStatusType = JSON.parse(message.data);

      setStats(parsed_data);
    };

    return () => {
      ws.close();
    };
  }, [ws]);

  return { stats };
}
