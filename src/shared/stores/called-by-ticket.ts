import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueueTicketType } from "../types/queue-ticket";

type CalledByTicketType = {
  queue_code: string;
  user_id: string;
};

export const calledByTicketSlice = createSlice({
  name: "called-by-ticket",
  initialState: [] as CalledByTicketType[],
  reducers: {
    setCalledByTickets: (state, action: PayloadAction<CalledByTicketType>) => {
      return [
        action.payload,
        ...state.filter(
          (item) => item.queue_code !== action.payload.queue_code
        ),
      ];
    },
    removeCalledByTickets: (state, action: PayloadAction<QueueTicketType>) => {
      return state.filter((item) => item.queue_code !== action.payload.code);
    },
  },
});

export const { setCalledByTickets, removeCalledByTickets } =
  calledByTicketSlice.actions;

export default calledByTicketSlice.reducer;
