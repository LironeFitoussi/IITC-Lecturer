import { useAppSelector, useAppDispatch } from '../store/hooks'
import { increment, decrement } from '../store/counterSlice'

const NestedCounter: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  const isEven = count % 2 === 0
  const isPositive = count > 0

  return (
    <div className="nested-counter">
      <h3>Nested Counter Component</h3>
      <p>Count: <strong>{count}</strong></p>
      
      <div className="counter-info">
        <p>Status: 
          <span className={isEven ? 'even' : 'odd'}>
            {isEven ? ' Even' : ' Odd'}
          </span>
          {isPositive ? ' & Positive' : ' & Non-positive'}
        </p>
      </div>
      
      <div className="nested-controls">
        <button 
          onClick={() => dispatch(increment())}
          className="increment-btn"
        >
          Increment from Nested
        </button>
        <button 
          onClick={() => dispatch(decrement())}
          className="decrement-btn"
        >
          Decrement from Nested
        </button>
      </div>
      
      <p>This deeply nested component can also access and modify the Redux state!</p>
    </div>
  )
}

export default NestedCounter
