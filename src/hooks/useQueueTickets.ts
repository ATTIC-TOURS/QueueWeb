import { useSelector } from "react-redux";
import { useQueueQuery } from "../pages/dashboard/shared/api/queue";
import { IRootState } from "../shared/stores/app";

export function useQueueTickets() {
  const branch_id = useSelector((state: IRootState) => state.branch.id);
    

  const { data: tickets, isSuccess: isTicketSuccess, refetch, isFetching } = useQueueQuery(branch_id ?? "");

  const waiting_tickets = tickets?.filter((ticket) => 
    ticket.status_id.toString() === "4");

  const in_progress_tickets = tickets?.filter((ticket) => 
    ticket.is_called && ticket.status_id.toString() === "4");

    

    return { tickets, isTicketSuccess, refetch, branch_id, isFetching, waiting_tickets, in_progress_tickets };
}