import CounterDisplay from './CounterDisplay'
import CounterControls from './CounterControls'
import NestedCounter from './NestedCounter'

const CounterContainer: React.FC = () => {
  return (
    <div className="counter-container">
      <h1>Redux Counter Demo</h1>
      <p>This demonstrates Redux state management across nested components</p>
      
      {/* First level nested component */}
      <CounterDisplay />
      
      {/* Second level nested component */}
      <CounterControls />
      
      {/* Third level nested component */}
      <NestedCounter />
    </div>
  )
}

export default CounterContainer
