import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

// Infer the `RootState` type from the store itself for useSelector typing
export type RootState = ReturnType<typeof store.getState>
