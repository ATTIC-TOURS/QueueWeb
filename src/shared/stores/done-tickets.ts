import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueueTicketListType, QueueTicketType } from "../types/queue-ticket";

const initialState: QueueTicketListType = [];
export const calledTicketsSlice = createSlice({
  name: "done-tickets",
  initialState,
  reducers: {
    setDoneTickets: (state, action: PayloadAction<QueueTicketType>) => {
      console.log(action.payload, state);
      return [action.payload, ...state.filter((item) => item.code !== action.payload.code)];
    },
  },
});

export const { setDoneTickets } = calledTicketsSlice.actions;

export default calledTicketsSlice.reducer;
