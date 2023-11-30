import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";

// Define a type for the slice state
interface CounterState {
  value: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  /**
   * Name of the slice
   */
  name: "counter",

  /**
   * Initial slice state
   */
  initialState,

  /**
   * Reducer is used to create methods for the slice
   * Reducer method accepts two arguments
   * state - current slice state
   * action - action performed on the state
   */
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// Export actions
export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions;

// Export count value for selection in components!
export const selectCount = (state: RootState) => state.counter.value

// Export reducer to be used in the store
export default counterSlice.reducer;
