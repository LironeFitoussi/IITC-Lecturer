import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { 
  addDeposit, 
  addWithdrawal
} from '../../store/savingsSlice';

const SavingsOperations: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [operationType, setOperationType] = useState<'deposit' | 'withdraw'>('deposit');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numAmount = parseFloat(amount) || 0;
    
    if (operationType === 'deposit') {
      dispatch(addDeposit({ amount: numAmount, description }));
    } else {
      dispatch(addWithdrawal({ amount: numAmount, description }));
    }

    // Reset form
    setAmount('');
    setDescription('');
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        💰 Savings Operations
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Operation Type Selection */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setOperationType('deposit')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              operationType === 'deposit'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            📈 Deposit
          </button>
          <button
            type="button"
            onClick={() => setOperationType('withdraw')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              operationType === 'withdraw'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            📉 Withdraw
          </button>
        </div>

        {/* Amount Input */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description (Optional)
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Salary, Groceries, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-colors ${
            operationType === 'deposit'
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {operationType === 'deposit' ? '💸 Make Deposit' : '💳 Make Withdrawal'}
        </button>
      </form>
    </div>
  );
};

export default SavingsOperations;
