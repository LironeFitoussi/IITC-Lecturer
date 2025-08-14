import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutUser, selectUser } from '../../store/authSlice';
import { fetchTransactions, fetchSummary, selectSummary } from '../../store/savingsSliceNew';
import SavingsOperations from './SavingsOperations';
import TransactionHistory from './TransactionHistory';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const summary = useAppSelector(selectSummary);

  useEffect(() => {
    // Fetch user data when dashboard loads
    dispatch(fetchSummary());
    dispatch(fetchTransactions({ limit: 20 }));
  }, [dispatch]);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await dispatch(logoutUser());
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                🏦 Welcome back, {user.firstName}!
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-1">
                  📧 {user.email}
                </span>
                <span className="flex items-center gap-1 font-semibold text-green-600 dark:text-green-400">
                  💰 Balance: ${user.balance.toFixed(2)}
                </span>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg self-start sm:self-auto"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Current Balance</p>
                  <p className="text-2xl font-bold">${summary.currentBalance.toFixed(2)}</p>
                </div>
                <div className="text-3xl opacity-80">💰</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Total Deposits</p>
                  <p className="text-2xl font-bold">+${summary.totalDeposits.toFixed(2)}</p>
                </div>
                <div className="text-3xl opacity-80">📈</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-medium">Total Withdrawals</p>
                  <p className="text-2xl font-bold">-${summary.totalWithdrawals.toFixed(2)}</p>
                </div>
                <div className="text-3xl opacity-80">📉</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Transactions</p>
                  <p className="text-2xl font-bold">{summary.totalTransactions}</p>
                </div>
                <div className="text-3xl opacity-80">📊</div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <SavingsOperations />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <TransactionHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
