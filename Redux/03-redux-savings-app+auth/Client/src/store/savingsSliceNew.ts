import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/client';

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
  summary: TransactionSummary | null;
  isLoading: boolean;
  error: string | null;
  transactionLoading: boolean;
}

export interface TransactionRequest {
  amount: number;
  description?: string;
}

// Initial state
const initialState: SavingsState = {
  transactions: [],
  summary: null,
  isLoading: false,
  error: null,
  transactionLoading: false,
};

// Async thunks
export const depositMoney = createAsyncThunk(
  'savings/deposit',
  async (data: TransactionRequest, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/savings/deposit', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Deposit failed'
      );
    }
  }
);

export const withdrawMoney = createAsyncThunk(
  'savings/withdraw',
  async (data: TransactionRequest, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/savings/withdraw', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Withdrawal failed'
      );
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  'savings/fetchTransactions',
  async (params: { limit?: number; skip?: number } = {}, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/savings/transactions', { params });
      return response.data.transactions;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch transactions'
      );
    }
  }
);

export const fetchSummary = createAsyncThunk(
  'savings/fetchSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/savings/summary');
      return response.data.summary;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch summary'
      );
    }
  }
);

// Savings slice
const savingsSlice = createSlice({
  name: 'savings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearTransactions: (state) => {
      state.transactions = [];
      state.summary = null;
    },
  },
  extraReducers: (builder) => {
    // Deposit
    builder
      .addCase(depositMoney.pending, (state) => {
        state.transactionLoading = true;
        state.error = null;
      })
      .addCase(depositMoney.fulfilled, (state, action) => {
        state.transactionLoading = false;
        state.error = null;
        // Add new transaction to the beginning of the list
        state.transactions.unshift(action.payload.transaction);
        // Update summary if available
        if (state.summary) {
          state.summary.currentBalance = action.payload.newBalance;
          state.summary.totalDeposits += action.payload.transaction.amount;
          state.summary.depositCount += 1;
          state.summary.totalTransactions += 1;
        }
      })
      .addCase(depositMoney.rejected, (state, action) => {
        state.transactionLoading = false;
        state.error = action.payload as string;
      });

    // Withdraw
    builder
      .addCase(withdrawMoney.pending, (state) => {
        state.transactionLoading = true;
        state.error = null;
      })
      .addCase(withdrawMoney.fulfilled, (state, action) => {
        state.transactionLoading = false;
        state.error = null;
        // Add new transaction to the beginning of the list
        state.transactions.unshift(action.payload.transaction);
        // Update summary if available
        if (state.summary) {
          state.summary.currentBalance = action.payload.newBalance;
          state.summary.totalWithdrawals += action.payload.transaction.amount;
          state.summary.withdrawalCount += 1;
          state.summary.totalTransactions += 1;
        }
      })
      .addCase(withdrawMoney.rejected, (state, action) => {
        state.transactionLoading = false;
        state.error = action.payload as string;
      });

    // Fetch transactions
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
        state.error = null;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch summary
    builder
      .addCase(fetchSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload;
        state.error = null;
      })
      .addCase(fetchSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { clearError, clearTransactions } = savingsSlice.actions;

// Selectors
export const selectSavings = (state: { auth: any; savings: SavingsState; counter: any }) => state.savings;
export const selectTransactions = (state: { auth: any; savings: SavingsState; counter: any }) => state.savings.transactions;
export const selectSummary = (state: { auth: any; savings: SavingsState; counter: any }) => state.savings.summary;
export const selectSavingsLoading = (state: { auth: any; savings: SavingsState; counter: any }) => state.savings.isLoading;
export const selectTransactionLoading = (state: { auth: any; savings: SavingsState; counter: any }) => state.savings.transactionLoading;
export const selectSavingsError = (state: { auth: any; savings: SavingsState; counter: any }) => state.savings.error;

export default savingsSlice.reducer;
