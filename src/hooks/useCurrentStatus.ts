import { useSelector } from "react-redux";
import { IRootState } from "../shared/stores/app";
import { useCurrentStatusQuery } from "../pages/dashboard/shared/api/queue";

export function useCurrentStatus() {
  const id = useSelector((state: IRootState) => state.branch.id);

  const { data: status, isSuccess: isCurrentStatusSuccess, refetch } = useCurrentStatusQuery(id ?? "");

  return { status, isCurrentStatusSuccess, refetch};
}
