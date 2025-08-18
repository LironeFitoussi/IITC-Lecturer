import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: string
  name: string
  balance: number
  createdAt: string
}

export interface Transaction {
  id: string
  userId: string
  type: 'deposit' | 'withdraw'
  amount: number
  timestamp: string
  description?: string
}

export interface SavingsState {
  users: User[]
  transactions: Transaction[]
  selectedUserId: string | null
  loading: boolean
  error: string | null
}

const initialState: SavingsState = {
  users: [],
  transactions: [],
  selectedUserId: null,
  loading: false,
  error: null
}

export const savingsSlice = createSlice({
  name: 'savings',
  initialState,
  reducers: {
    // User management
    addUser: (state, action: PayloadAction<{ name: string }>) => {
      const newUser: User = {
        id: Date.now().toString(),
        name: action.payload.name,
        balance: 0,
        createdAt: new Date().toISOString()
      }
      state.users.push(newUser)
      state.error = null
    },

    deleteUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload
      state.users = state.users.filter(user => user.id !== userId)
      state.transactions = state.transactions.filter(transaction => transaction.userId !== userId)
      if (state.selectedUserId === userId) {
        state.selectedUserId = null
      }
      state.error = null
    },

    selectUser: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload
      state.error = null
    },

    clearSelectedUser: (state) => {
      state.selectedUserId = null
    },

    // Savings operations
    deposit: (state, action: PayloadAction<{ userId: string; amount: number; description?: string }>) => {
      const { userId, amount, description } = action.payload
      
      if (amount <= 0) {
        state.error = 'Deposit amount must be positive'
        return
      }

      const user = state.users.find(u => u.id === userId)
      if (!user) {
        state.error = 'User not found'
        return
      }

      // Update user balance
      user.balance += amount

      // Add transaction record
      const transaction: Transaction = {
        id: Date.now().toString(),
        userId,
        type: 'deposit',
        amount,
        timestamp: new Date().toISOString(),
        description
      }
      state.transactions.push(transaction)
      state.error = null
    },

    withdraw: (state, action: PayloadAction<{ userId: string; amount: number; description?: string }>) => {
      const { userId, amount, description } = action.payload
      
      if (amount <= 0) {
        state.error = 'Withdrawal amount must be positive'
        return
      }

      const user = state.users.find(u => u.id === userId)
      if (!user) {
        state.error = 'User not found'
        return
      }

      if (user.balance < amount) {
        state.error = 'Insufficient funds'
        return
      }

      // Update user balance
      user.balance -= amount

      // Add transaction record
      const transaction: Transaction = {
        id: Date.now().toString(),
        userId,
        type: 'withdraw',
        amount,
        timestamp: new Date().toISOString(),
        description
      }
      state.transactions.push(transaction)
      state.error = null
    },

    // Utility actions
    clearError: (state) => {
      state.error = null
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  }
})

// Export actions
export const {
  addUser,
  deleteUser,
  selectUser,
  clearSelectedUser,
  deposit,
  withdraw,
  clearError,
  setLoading
} = savingsSlice.actions

// Selectors
export const selectAllUsers = (state: { savings: SavingsState }) => state.savings.users
export const selectSelectedUser = (state: { savings: SavingsState }) => {
  const selectedId = state.savings.selectedUserId
  return selectedId ? state.savings.users.find(user => user.id === selectedId) : null
}
export const selectUserTransactions = (state: { savings: SavingsState }, userId: string) =>
  state.savings.transactions.filter(transaction => transaction.userId === userId)

export default savingsSlice.reducer
