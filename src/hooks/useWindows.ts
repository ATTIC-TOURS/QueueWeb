import { useState, useEffect, useCallback } from "react";
import { useLazyWindowQuery } from "../pages/dashboard/shared/api/queue";
import { QueueWindowListType } from "../shared/types/queue-ticket";

export function useWindows() {
  const [windows, setWindows] = useState<QueueWindowListType>([]);

  const [fetchWindow, { isLoading: isWindowLoading }] = useLazyWindowQuery();

  useEffect(() => {
    const fetchWindows = async () => {
      const windows = await fetchWindow().unwrap();
      setWindows(windows);
    };

    fetchWindows();
  }, [fetchWindow]);

  const windows_name = useCallback(
    (window_id: string) => {
      return windows.find((window) => window.id === window_id)?.name;
    },
    [windows]
  );

  return { windows, windows_name, isWindowLoading };
}
