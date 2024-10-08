import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IBranchState {
  id: string | null;
  name: string | null;
}

const initialState: IBranchState = {
  id: null,
  name: null,
};

export const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    setBranchId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setBranchName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    clearBranch: (state) => {
      state.id = null;
      state.name = null;
      sessionStorage.removeItem("is_authenticated");
    },
  },
});

export const { setBranchId, setBranchName, clearBranch } = branchSlice.actions;

export default branchSlice.reducer;
