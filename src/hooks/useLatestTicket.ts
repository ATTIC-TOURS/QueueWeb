import { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../shared/stores/app";
import { IModalState, setModalStatus } from "../shared/stores/modal";
import { useQueueTickets } from "./useQueueTickets";

export const useLatestTicket = () => {
  const [is_ticket_shown, setIsTicketShown] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { tickets } = useQueueTickets();

  const latest_ticket = useMemo(() => {
    if (tickets && tickets.length > 0) {
      const calledTickets = tickets.filter((ticket) => ticket.is_called);

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
  }, [tickets]);

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
