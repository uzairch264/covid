import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCases = createAsyncThunk(
  "covid/fetchCases",
  async () => {
    const response = await axios.get("https://disease.sh/v3/covid-19/countries");
    const cases = response.data.map((dataCenter) => ({
      key: dataCenter.countryInfo._id,
      country: dataCenter.country,
      cases: dataCenter.cases,
      deaths: dataCenter.deaths,
      active: dataCenter.active,
      recovered: dataCenter.recovered,
    }));
    return cases;
  }
);

export const covidSlice = createSlice({
  name: "covid",
  initialState: {
    cases: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCases.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cases = action.payload;
      })
      .addCase(fetchCases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectCases = (state) => state.covid.cases;
export const selectLoading = (state) => state.covid.loading;
export const selectError = (state) => state.covid.error;

export default covidSlice.reducer;
