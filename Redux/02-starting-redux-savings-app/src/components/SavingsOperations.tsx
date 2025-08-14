import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { deposit, withdraw, clearError, selectSelectedUser } from '../store/savingsSlice'

const SavingsOperations: React.FC = () => {
  const dispatch = useAppDispatch()
  const selectedUser = useAppSelector(selectSelectedUser)
  const error = useAppSelector(state => state.savings.error)
  
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [operationType, setOperationType] = useState<'deposit' | 'withdraw'>('deposit')

  const handleOperation = () => {
    if (!selectedUser) {
      return
    }

    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      return
    }

    const operationData = {
      userId: selectedUser.id,
      amount: numAmount,
      description: description.trim() || undefined
    }

    if (operationType === 'deposit') {
      dispatch(deposit(operationData))
    } else {
      dispatch(withdraw(operationData))
    }

    // Clear form on success (if no error)
    setAmount('')
    setDescription('')
  }

  const handleClearError = () => {
    dispatch(clearError())
  }

  if (!selectedUser) {
    return (
      <div className="savings-operations">
        <div className="no-user-selected">
          <h3>💰 Savings Operations</h3>
          <p>Please select a user to manage their savings</p>
        </div>
      </div>
    )
  }

  return (
    <div className="savings-operations">
      <div className="operations-header">
        <h3>💰 Savings Operations</h3>
        <div className="selected-user-display">
          <span className="user-name">{selectedUser.name}</span>
          <span className="user-balance">${selectedUser.balance.toFixed(2)}</span>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <span>❌ {error}</span>
          <button onClick={handleClearError}>×</button>
        </div>
      )}

      <div className="operation-form">
        <div className="operation-type-selector">
          <button 
            className={`type-btn ${operationType === 'deposit' ? 'active' : ''}`}
            onClick={() => setOperationType('deposit')}
          >
            💵 Deposit
          </button>
          <button 
            className={`type-btn ${operationType === 'withdraw' ? 'active' : ''}`}
            onClick={() => setOperationType('withdraw')}
          >
            💸 Withdraw
          </button>
        </div>

        <div className="form-inputs">
          <div className="input-group">
            <label>Amount ($)</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div className="input-group">
            <label>Description (optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Monthly savings, Emergency fund"
            />
          </div>

          <button 
            className={`operation-btn ${operationType}`}
            onClick={handleOperation}
            disabled={!amount || parseFloat(amount) <= 0}
          >
            {operationType === 'deposit' ? '💵 Deposit' : '💸 Withdraw'} ${amount || '0.00'}
          </button>
        </div>
      </div>

      <div className="balance-info">
        <div className="current-balance">
          <h4>Current Balance</h4>
          <div className="balance-amount">${selectedUser.balance.toFixed(2)}</div>
        </div>

        {operationType === 'withdraw' && (
          <div className="withdrawal-info">
            <p>
              Available to withdraw: <strong>${selectedUser.balance.toFixed(2)}</strong>
            </p>
            {parseFloat(amount) > selectedUser.balance && (
              <p className="insufficient-funds">⚠️ Insufficient funds</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SavingsOperations
