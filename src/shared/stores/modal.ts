import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalTitleType } from "../types/queue-ticket";

export interface IModalState {
  active: boolean;
  modalFor: ModalTitleType;
}

const initialState: IModalState = {
  active: false,
  modalFor: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalStatus: (state, action: PayloadAction<IModalState>) => {
      state.active = action.payload.active;
      state.modalFor = action.payload.modalFor;
    },
    clearModalStatus: (state) => {
      state.active = false;
      state.modalFor = null;
    },
  },
});

export const { setModalStatus, clearModalStatus } = modalSlice.actions;

export default modalSlice.reducer;
