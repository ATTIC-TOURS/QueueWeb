import { WaitingCallType } from "../shared/types/tv";
import { useEffect, useState } from "react";
import { useWebSocket } from "./useWebSocket";

export function useCallWebSocket() {
  const { ws } = useWebSocket({ type: "call" });

  const [called, setCalled] = useState<WaitingCallType>();

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);

      console.log(data);
      setCalled(data);
    };
  }, [ws]);

  return { called };
}
