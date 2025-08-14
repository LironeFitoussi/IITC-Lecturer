import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Types
export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  description?: string;
  balanceAfter: number;
  createdAt: string;
}

export interface TransactionSummary {
  currentBalance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  depositCount: number;
  withdrawalCount: number;
  totalTransactions: number;
}

export interface SavingsState {
  transactions: Transaction[];
  summary: TransactionSummary;
}

// Initial state
const initialState: SavingsState = {
  transactions: [],
  summary: {
    currentBalance: 1000, // Starting balance for demo
    totalDeposits: 1000,
    totalWithdrawals: 0,
    depositCount: 1,
    withdrawalCount: 0,
    totalTransactions: 1
  },
};

// Basic savings slice with synchronous actions
const savingsSlice = createSlice({
  name: 'savings',
  initialState,
  reducers: {
    // Add a deposit transaction
    addDeposit: (state, action: PayloadAction<{ amount: number; description?: string }>) => {
      const { amount, description } = action.payload;
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'deposit',
        amount,
        description,
        balanceAfter: state.summary.currentBalance + amount,
        createdAt: new Date().toISOString()
      };
      
      state.transactions.unshift(newTransaction);
      state.summary.currentBalance += amount;
      state.summary.totalDeposits += amount;
      state.summary.depositCount += 1;
      state.summary.totalTransactions += 1;
    },

    // Add a withdrawal transaction
    addWithdrawal: (state, action: PayloadAction<{ amount: number; description?: string }>) => {
      const { amount, description } = action.payload;

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'withdraw',
        amount,
        description,
        balanceAfter: state.summary.currentBalance - amount,
        createdAt: new Date().toISOString()
      };
      
      state.transactions.unshift(newTransaction);
      state.summary.currentBalance -= amount;
      state.summary.totalWithdrawals += amount;
      state.summary.withdrawalCount += 1;
      state.summary.totalTransactions += 1;
    },

    // Clear all transactions
    clearTransactions: (state) => {
      state.transactions = [];
      state.summary = {
        currentBalance: 1000,
        totalDeposits: 1000,
        totalWithdrawals: 0,
        depositCount: 1,
        withdrawalCount: 0,
        totalTransactions: 1
      };
    },
  },
});

// Export actions
export const { 
  addDeposit, 
  addWithdrawal, 
  clearTransactions, 
} = savingsSlice.actions;

// Selectors
export const selectSavings = (state: { auth: any; savings: SavingsState }) => state.savings;
export const selectTransactions = (state: { auth: any; savings: SavingsState }) => state.savings.transactions;
export const selectSummary = (state: { auth: any; savings: SavingsState }) => state.savings.summary;

export default savingsSlice.reducer;
