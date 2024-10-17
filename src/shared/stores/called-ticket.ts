import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WaitingCallType } from "../types/tv";
import { QueueTicketType } from "../types/queue-ticket";

const initialState: WaitingCallType[] = [];
export const doneTicketsSlice = createSlice({
  name: "called-tickets",
  initialState,
  reducers: {
    setCalledTickets: (state, action: PayloadAction<WaitingCallType>) => {
      return [
        action.payload,
        ...state.filter(
          (item) => item.queue_code !== action.payload.queue_code
        ),
      ];
    },
    removeCalledTicket: (state, action: PayloadAction<QueueTicketType>) => {
      const test = state.filter(
        (item) => item.queue_code !== action.payload.code
      );
      console.log(test);
      return test;
    },
  },
});

export const { setCalledTickets, removeCalledTicket } =
  doneTicketsSlice.actions;

export default doneTicketsSlice.reducer;
