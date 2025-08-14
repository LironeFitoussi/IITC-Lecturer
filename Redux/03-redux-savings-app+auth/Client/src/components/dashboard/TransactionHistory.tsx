import { useAppSelector } from '../../store/hooks';
import { selectTransactions } from '../../store/savingsSlice';

const TransactionHistory: React.FC = () => {
  const transactions = useAppSelector(selectTransactions);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        📊 Transaction History
      </h2>
      
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-2">📝</div>
          <p>No transactions yet</p>
          <p className="text-sm">Start by making a deposit or withdrawal</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`p-4 rounded-lg border-l-4 ${
                transaction.type === 'deposit'
                  ? 'bg-green-50 border-green-400 dark:bg-green-900/20 dark:border-green-500'
                  : 'bg-red-50 border-red-400 dark:bg-red-900/20 dark:border-red-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-semibold ${
                      transaction.type === 'deposit'
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {transaction.type === 'deposit' ? '📈 Deposit' : '📉 Withdrawal'}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {transaction.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      {transaction.description}
                    </p>
                  )}
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Balance after: ${transaction.balanceAfter.toFixed(2)}
                  </div>
                </div>
                
                <div className={`text-lg font-bold ${
                  transaction.type === 'deposit'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
