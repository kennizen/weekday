import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Filter from "../components/header/Filter";

type InitState = {
  roles: Filter[];
  numOfEmployees: Filter[];
  minExp: Filter;
  location: Filter[];
  minBasePay: Filter;
  companyName: string;
};

const initialState: InitState = {
  location: [],
  minBasePay: { id: "", label: "" },
  minExp: { id: "", label: "" },
  numOfEmployees: [],
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
    numOfEmployees: (state, action: PayloadAction<Filter[]>) => {
      state.numOfEmployees = action.payload;
    },
    roles: (state, action: PayloadAction<Filter[]>) => {
      state.roles = action.payload;
    },
    companyName: (state, action: PayloadAction<string>) => {
      state.companyName = action.payload;
    },
  },
});

export const { companyName, location, minBasePay, minExp, numOfEmployees, roles } = FilterSlice.actions;

export default FilterSlice.reducer;
