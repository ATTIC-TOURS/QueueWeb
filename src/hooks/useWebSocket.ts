import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { socket_base_url } from "../configs/web-socket";
import { IRootState } from "../shared/stores/app";

export function useWebSocket({ type }: { type: string }) {
  const branch_id = useSelector((state: IRootState) => state.branch.id);

  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(
      `${socket_base_url}/current_queues/${type}/${branch_id}/`
    );

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [branch_id, type]);

  return { ws };
}
