import { useAppSelector } from '../store/hooks'

const CounterDisplay: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value)

  return (
    <div className="counter-display">
      <h2>Current Count: {count}</h2>
      <p>This component displays the counter value from Redux store</p>
    </div>
  )
}

export default CounterDisplay
