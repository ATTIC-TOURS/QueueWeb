import { useSelector } from "react-redux";
import { useQueueQuery } from "../pages/dashboard/shared/api/queue";
import { IRootState } from "../shared/stores/app";

export function useQueueTickets() {
  const branch_id = useSelector((state: IRootState) => state.branch.id);
    

  const { data: tickets, isSuccess: isTicketSuccess, refetch, isFetching } = useQueueQuery(branch_id ?? "");

    return { tickets, isTicketSuccess, refetch, branch_id, isFetching };
}