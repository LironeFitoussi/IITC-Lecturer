import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'

const CounterDisplay: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value)

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
        Current Count: <span className="bg-blue-100 dark:bg-blue-800 px-3 py-1 rounded-full">{count}</span>
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">This component displays the counter value from Redux store</p>
    </div>
  )
}

export default CounterDisplay
