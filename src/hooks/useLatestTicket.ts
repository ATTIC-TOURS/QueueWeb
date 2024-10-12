import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueueQuery } from "../pages/dashboard/shared/api/queue";
import { AppDispatch, IRootState } from "../shared/stores/app";
import { IModalState, setModalStatus } from "../shared/stores/modal";

export const useLatestTicket = () => {
  const branch_id = useSelector((state: IRootState) => state.branch.id);
  const { data: new_ticket, isSuccess } = useQueueQuery(branch_id ?? "");
  const [is_ticket_shown, setIsTicketShown] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const latest_ticket = useMemo(() => {
    if (isSuccess && new_ticket && new_ticket.length > 0) {
      const calledTickets = new_ticket.filter((ticket) => ticket.is_called);

      if (calledTickets.length === 0) {
        return null;
      }

      const latest_called_ticket = calledTickets.reduce((latest, current) => {
        const latest_date = new Date(latest.created_at);
        const current_date = new Date(current.created_at);

        return current_date > latest_date ? current : latest;
      });

      return latest_called_ticket;
    }
    return null;
  }, [isSuccess, new_ticket]);

  useEffect(() => {
    if (latest_ticket) {
      dispatch(setModalStatus({ active: true, modalFor: "in-progress" }));
      setIsTicketShown(true);
    }
  }, [latest_ticket, dispatch]);

  useEffect(() => {
    const modal_status: IModalState = {
      active: false,
      modalFor: "in-progress",
    };
    setTimeout(() => {
      setIsTicketShown(false);
      dispatch(setModalStatus(modal_status));
    }, 10000);
  }, [dispatch, is_ticket_shown]);

  return { latest_ticket, is_ticket_shown };
};
