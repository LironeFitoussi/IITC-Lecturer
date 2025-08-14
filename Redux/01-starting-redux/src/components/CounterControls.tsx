import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount, reset } from '../store/counter/counterSlice'

const CounterControls: React.FC = () => {
  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState<string>('5')

  const handleIncrementByAmount = () => {
    const amount = parseInt(incrementAmount)
    if (!isNaN(amount)) {
      dispatch(incrementByAmount(amount))
    }
  }

  return (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">Counter Controls</h3>
      
      <div className="flex flex-wrap justify-center gap-2">
        <button 
          onClick={() => dispatch(increment())}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          +1
        </button>
        <button 
          onClick={() => dispatch(decrement())}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          -1
        </button>
        <button 
          onClick={() => dispatch(reset())}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Reset
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-xs mx-auto">
        <input
          type="number"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full sm:w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
        <button 
          onClick={handleIncrementByAmount}
          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Add Amount
        </button>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400">This component contains controls to modify the counter</p>
    </div>
  )
}

export default CounterControls
