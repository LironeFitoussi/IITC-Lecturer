import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import savingsReducer from './savingsSliceNew'
import counterReducer from './counterSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    savings: savingsReducer,
    counter: counterReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
