import { useAppSelector } from '../store/hooks'
import { selectSelectedUser, selectUserTransactions } from '../store/savingsSlice'

const TransactionHistory: React.FC = () => {
  const selectedUser = useAppSelector(selectSelectedUser)
  const transactions = useAppSelector(state => 
    selectedUser ? selectUserTransactions(state, selectedUser.id) : []
  )

  if (!selectedUser) {
    return (
      <div className="transaction-history">
        <h3>📊 Transaction History</h3>
        <p>Select a user to view their transaction history</p>
      </div>
    )
  }

  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  return (
    <div className="transaction-history">
      <div className="history-header">
        <h3>📊 Transaction History</h3>
        <p>Showing {transactions.length} transactions for {selectedUser.name}</p>
      </div>

      {transactions.length === 0 ? (
        <div className="no-transactions">
          <p>No transactions yet. Make your first deposit or withdrawal!</p>
        </div>
      ) : (
        <div className="transactions-list">
          {sortedTransactions.map(transaction => (
            <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
              <div className="transaction-icon">
                {transaction.type === 'deposit' ? '💵' : '💸'}
              </div>
              
              <div className="transaction-details">
                <div className="transaction-type-amount">
                  <span className="type">{transaction.type}</span>
                  <span className={`amount ${transaction.type}`}>
                    {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </span>
                </div>
                
                {transaction.description && (
                  <div className="transaction-description">
                    {transaction.description}
                  </div>
                )}
                
                <div className="transaction-timestamp">
                  {new Date(transaction.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {transactions.length > 0 && (
        <div className="transaction-summary">
          <div className="summary-item">
            <span>Total Deposits:</span>
            <span className="deposit">
              +${transactions
                .filter(t => t.type === 'deposit')
                .reduce((sum, t) => sum + t.amount, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="summary-item">
            <span>Total Withdrawals:</span>
            <span className="withdraw">
              -${transactions
                .filter(t => t.type === 'withdraw')
                .reduce((sum, t) => sum + t.amount, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="summary-item total">
            <span>Current Balance:</span>
            <span>${selectedUser.balance.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionHistory
