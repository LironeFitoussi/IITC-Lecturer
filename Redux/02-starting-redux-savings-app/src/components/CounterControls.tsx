import { useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import { increment, decrement, incrementByAmount, reset } from '../store/counterSlice'

const CounterControls: React.FC = () => {
  const dispatch = useAppDispatch()
  const [incrementAmount, setIncrementAmount] = useState<string>('5')

  const handleIncrementByAmount = () => {
    const amount = parseInt(incrementAmount)
    if (!isNaN(amount)) {
      dispatch(incrementByAmount(amount))
    }
  }

  return (
    <div className="counter-controls">
      <h3>Counter Controls</h3>
      <div className="button-group">
        <button onClick={() => dispatch(increment())}>
          +1
        </button>
        <button onClick={() => dispatch(decrement())}>
          -1
        </button>
        <button onClick={() => dispatch(reset())}>
          Reset
        </button>
      </div>
      
      <div className="custom-increment">
        <input
          type="number"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <button onClick={handleIncrementByAmount}>
          Add Amount
        </button>
      </div>
      
      <p>This component contains controls to modify the counter</p>
    </div>
  )
}

export default CounterControls
