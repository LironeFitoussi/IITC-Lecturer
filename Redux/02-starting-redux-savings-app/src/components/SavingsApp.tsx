import UserManager from './UserManager'
import SavingsOperations from './SavingsOperations'
import TransactionHistory from './TransactionHistory'
import { useAppSelector } from '../store/hooks'
import { selectAllUsers } from '../store/savingsSlice'

const SavingsApp: React.FC = () => {
  const users = useAppSelector(selectAllUsers)
  const selectedUserId = useAppSelector(state => state.savings.selectedUserId)
  
  const totalSavings = users.reduce((total, user) => total + user.balance, 0)

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
            🏦 Personal Savings Manager
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700 text-center">
              <span className="block text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Total Users</span>
              <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">{users.length}</span>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700 text-center">
              <span className="block text-sm text-green-600 dark:text-green-400 font-medium mb-1">Total Savings</span>
              <span className="text-2xl font-bold text-green-700 dark:text-green-300">${totalSavings.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <UserManager />
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <SavingsOperations />
            </div>
            {selectedUserId && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <TransactionHistory />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 mt-6 border border-indigo-200 dark:border-indigo-700">
          <p className="text-center text-indigo-700 dark:text-indigo-300 font-medium">
            💡 Tip: Select a user from the left panel to manage their savings and view transaction history
          </p>
        </div>
      </div>
    </div>
  )
}

export default SavingsApp
