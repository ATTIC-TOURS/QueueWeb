import { useEffect, useState } from "react";
import { useWebSocket } from "./useWebSocket";
import { NowServingListType, NowServingType } from "../shared/types/tv";

export function useNowServing() {
  const { ws } = useWebSocket({ type: "in-progress" });

  const [now_serving, setNowServing] = useState<NowServingListType | null>(
    null
  );

  function NowServingSorter(a: NowServingType, b: NowServingType) {
    const item_a = new Date(a.updated_at);
    const item_b = new Date(b.updated_at);

    return item_b.getTime() - item_a.getTime();
  }
  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (message) => {
      const parsed_data: NowServingListType = JSON.parse(message.data);

      const sorted_data = parsed_data.sort((a, b) => NowServingSorter(a, b));

      setNowServing(sorted_data);

      return () => {
        ws.close();
      };
    };
  }, [ws]);

  return { now_serving };
}
