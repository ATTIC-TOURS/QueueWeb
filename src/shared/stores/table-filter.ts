import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IFilterFor = "Service" | "Window" | undefined;

interface IFilterState {
  filter_for: IFilterFor;
  filter_item: string;
}

const initialState: IFilterState = {
  filter_for: undefined,
  filter_item: "",
};

export const serviceFilterSlice = createSlice({
  name: "service-filter",
  initialState,
  reducers: {
    setFilterFor: (state, action: PayloadAction<IFilterFor>) => {
      state.filter_for = action.payload;
    },
    setFilterItem: (state, action: PayloadAction<string>) => {
      state.filter_item = action.payload;
    },
  },
});

export const { setFilterFor, setFilterItem } = serviceFilterSlice.actions;

export default serviceFilterSlice.reducer;
