import { useEffect, useState } from "react";
import { StatusType } from "../shared/types/queue-ticket";
import { useLazyViewableStatusQuery } from "../pages/dashboard/shared/api/queue";

export function useViewableStatus() {
  const [viewableStatus, setViewableStatus] = useState<StatusType[]>([]);

  const [fetchViewableStatus, { isLoading: isViewableStatusLoading }] =
    useLazyViewableStatusQuery();

  useEffect(() => {
    fetchViewableStatus()
      .then((data) => {
        if (data) {
          const res = data.data as StatusType[];
          setViewableStatus(res);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [fetchViewableStatus]);

  return { viewableStatus, isViewableStatusLoading };
}
