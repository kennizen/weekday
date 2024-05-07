import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Filter from "../components/header/Filter";

type FilterState = {
  roles: Filter[];
  minExp: Filter;
  location: Filter[];
  minBasePay: Filter;
  companyName: string;
};

const initialState: FilterState = {
  location: [],
  minBasePay: { id: "", label: "" },
  minExp: { id: "", label: "" },
  roles: [],
  companyName: "",
};

export const FilterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    location: (state, action: PayloadAction<Filter[]>) => {
      state.location = action.payload;
    },
    minBasePay: (state, action: PayloadAction<Filter>) => {
      state.minBasePay = action.payload;
    },
    minExp: (state, action: PayloadAction<Filter>) => {
      state.minExp = action.payload;
    },
    roles: (state, action: PayloadAction<Filter[]>) => {
      state.roles = action.payload;
    },
    companyName: (state, action: PayloadAction<string>) => {
      state.companyName = action.payload;
    },
  },
});

export const { companyName, location, minBasePay, minExp, roles } = FilterSlice.actions;

export default FilterSlice.reducer;
