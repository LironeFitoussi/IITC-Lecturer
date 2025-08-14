import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../store/counter/counterSlice'
import type { RootState } from '../store/store'

const NestedCounter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  const isEven = count % 2 === 0
  const isPositive = count > 0

  return (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">Nested Counter Component</h3>
      <p className="text-lg">Count: <strong className="text-2xl font-bold text-purple-700 dark:text-purple-300">{count}</strong></p>
      
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-purple-200 dark:border-purple-700">
        <p className="text-sm">Status: 
          <span className={`font-semibold ml-1 px-2 py-1 rounded-full text-xs ${
            isEven 
              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
              : 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100'
          }`}>
            {isEven ? 'Even' : 'Odd'}
          </span>
          <span className={`font-semibold ml-2 px-2 py-1 rounded-full text-xs ${
            isPositive 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' 
              : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
          }`}>
            {isPositive ? 'Positive' : 'Non-positive'}
          </span>
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-2">
        <button 
          onClick={() => dispatch(increment())}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          🚀 Increment from Nested
        </button>
        <button 
          onClick={() => dispatch(decrement())}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          🔻 Decrement from Nested
        </button>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 italic">This deeply nested component can also access and modify the Redux state!</p>
    </div>
  )
}

export default NestedCounter
