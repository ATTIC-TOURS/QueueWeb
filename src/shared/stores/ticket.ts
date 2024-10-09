import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueueTicketType } from "../types/queue-ticket";

const initialState: QueueTicketType = {
  branch_id: "",
  created_at: "",
  id: "",
  is_called: false,
  queue_no: 0,
  service_id: "",
  status_id: "",
  updated_at: "",
  window_id: "",
};

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setTicket: (_, action: PayloadAction<QueueTicketType>) => {
      return action.payload;
    },
  },
});

export const { setTicket } = ticketSlice.actions;

export default ticketSlice.reducer;
