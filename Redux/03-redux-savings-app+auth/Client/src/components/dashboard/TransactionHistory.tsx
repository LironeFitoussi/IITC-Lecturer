import { useAppSelector } from '../../store/hooks';
import { selectTransactions, selectSavingsLoading } from '../../store/savingsSliceNew';

const TransactionHistory: React.FC = () => {
  const transactions = useAppSelector(selectTransactions);
  const isLoading = useAppSelector(selectSavingsLoading);

  if (isLoading) {
    return (
      <div className="transaction-history">
        <h3>📊 Transaction History</h3>
        <div className="loading">🔄 Loading transactions...</div>
      </div>
    );
  }

  return (
    <div className="transaction-history">
      <div className="history-header">
        <h3>📊 Transaction History</h3>
        <p>Showing {transactions.length} recent transactions</p>
      </div>

      {transactions.length === 0 ? (
        <div className="no-transactions">
          <div className="empty-state">
            <span className="empty-icon">💳</span>
            <h4>No transactions yet</h4>
            <p>Make your first deposit or withdrawal to get started!</p>
          </div>
        </div>
      ) : (
        <div className="transactions-list">
          {transactions.map(transaction => (
            <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
              <div className="transaction-icon">
                {transaction.type === 'deposit' ? '💵' : '💸'}
              </div>
              
              <div className="transaction-details">
                <div className="transaction-main">
                  <span className="transaction-type">
                    {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                  </span>
                  <span className={`transaction-amount ${transaction.type}`}>
                    {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </span>
                </div>
                
                {transaction.description && (
                  <div className="transaction-description">
                    {transaction.description}
                  </div>
                )}
                
                <div className="transaction-meta">
                  <span className="transaction-date">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </span>
                  <span className="balance-after">
                    Balance: ${transaction.balanceAfter.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {transactions.length > 0 && (
        <div className="history-footer">
          <p className="transaction-note">
            💡 All transactions are processed securely and recorded in real-time
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
