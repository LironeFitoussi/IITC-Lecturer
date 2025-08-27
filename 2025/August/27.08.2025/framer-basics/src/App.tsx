import Cube from './components/Cube'
import VariantCube from './components/VariantCube'
import ConfigDemo from './components/ConfigDemo'

function App() {

  return (
    <div className="flex flex-col items-center gap-6 justify-center min-h-screen bg-gray-100 gap-4">
      {/* <div className='p-4 bg-indigo-500 rounded-lg shadow-md '>
        <Cube />
      </div>
      <div className='p-4 bg-indigo-500 rounded-lg shadow-md'>
        <VariantCube />
      </div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1> */}
      <div className='p-4 bg-indigo-500 rounded-lg shadow-md'>
        <ConfigDemo />
      </div>
    </div>
  )
}

export default App
