import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  depositMoney, 
  withdrawMoney, 
  clearError,
  selectTransactionLoading,
  selectSavingsError 
} from '../../store/savingsSliceNew';
import { updateUserBalance, selectUser } from '../../store/authSlice';

const SavingsOperations: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectTransactionLoading);
  const error = useAppSelector(selectSavingsError);
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [operationType, setOperationType] = useState<'deposit' | 'withdraw'>('deposit');

  const handleOperation = async () => {
    if (!user) return;

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return;
    }

    const operationData = {
      amount: numAmount,
      description: description.trim() || undefined
    };

    try {
      let result;
      if (operationType === 'deposit') {
        result = await dispatch(depositMoney(operationData)).unwrap();
      } else {
        result = await dispatch(withdrawMoney(operationData)).unwrap();
      }

      // Update user balance in auth state
      dispatch(updateUserBalance(result.newBalance));

      // Clear form on success
      setAmount('');
      setDescription('');
    } catch (err) {
      // Error is handled by the slice
      console.error('Transaction failed:', err);
    }
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  if (!user) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">💰 Savings Operations</h3>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const numAmount = parseFloat(amount);
  const isValidAmount = !isNaN(numAmount) && numAmount > 0;
  const canWithdraw = operationType === 'withdraw' && numAmount > user.balance;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">💰 Savings Operations</h3>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <span>Current Balance: </span>
          <span className="font-bold text-green-600 dark:text-green-400">${user.balance.toFixed(2)}</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 flex items-center justify-between">
          <span className="text-red-700 dark:text-red-300 text-sm">❌ {error}</span>
          <button 
            onClick={handleClearError}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200 font-bold text-lg"
          >
            ×
          </button>
        </div>
      )}

      <div className="space-y-4">
        {/* Operation Type Selector */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <button 
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              operationType === 'deposit' 
                ? 'bg-green-500 text-white shadow-md' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => setOperationType('deposit')}
            disabled={isLoading}
          >
            💵 Deposit
          </button>
          <button 
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              operationType === 'withdraw' 
                ? 'bg-red-500 text-white shadow-md' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            onClick={() => setOperationType('withdraw')}
            disabled={isLoading}
          >
            💸 Withdraw
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount ($)
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Monthly savings, Emergency fund"
              maxLength={200}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
            />
          </div>

          {canWithdraw && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3">
              <span className="text-yellow-800 dark:text-yellow-300 text-sm">
                ⚠️ Insufficient funds. Available: ${user.balance.toFixed(2)}
              </span>
            </div>
          )}

          <button 
            className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 ${
              operationType === 'deposit' 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            onClick={handleOperation}
            disabled={!isValidAmount || canWithdraw || isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                Processing...
              </span>
            ) : (
              `${operationType === 'deposit' ? '💵 Deposit' : '💸 Withdraw'} $${amount || '0.00'}`
            )}
          </button>
        </div>
      </div>

      {/* Operation Info */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-gray-300">Available to withdraw:</span>
          <span className="font-semibold text-green-600 dark:text-green-400">${user.balance.toFixed(2)}</span>
        </div>
        {operationType === 'deposit' && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-300">Balance after deposit:</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              ${(user.balance + (isValidAmount ? numAmount : 0)).toFixed(2)}
            </span>
          </div>
        )}
        {operationType === 'withdraw' && isValidAmount && !canWithdraw && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-300">Balance after withdrawal:</span>
            <span className="font-semibold text-orange-600 dark:text-orange-400">
              ${(user.balance - numAmount).toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavingsOperations;
