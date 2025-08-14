import CounterDisplay from './CounterDisplay'
import CounterControls from './CounterControls'
import NestedCounter from './NestedCounter'

const CounterContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Redux Counter Demo</h1>
        <p className="text-gray-600 dark:text-gray-300">This demonstrates Redux state management across nested components</p>
      </div>
      
      {/* First level nested component */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
        <CounterDisplay />
      </div>
      
      {/* Second level nested component */}
      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
        <CounterControls />
      </div>
      
      {/* Third level nested component */}
      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
        <NestedCounter />
      </div>
    </div>
  )
}

export default CounterContainer
