import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit uses Immer internally, so we can write "mutating" logic
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    reset: (state) => {
      state.value = 0
    }
  }
})

// Export action creators
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions

// Export the reducer
export default counterSlice.reducer
