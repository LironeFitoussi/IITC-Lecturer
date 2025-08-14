import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CounterContainer from './components/CounterContainer'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-8">
      <div className="flex items-center gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" className="transition-transform hover:scale-110">
          <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="transition-transform hover:scale-110">
          <img src={reactLogo} className="h-16 w-16 animate-spin-slow" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Vite + React + Redux Toolkit
      </h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <CounterContainer />
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
        This demo shows Redux Toolkit state management across nested components with Tailwind CSS v4 styling
      </p>
    </div>
  )
}

export default App
