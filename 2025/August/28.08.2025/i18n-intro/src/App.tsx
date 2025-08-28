import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
        <div className=''>
          <p className=''>אני מדבר עברית</p>
          <p>Je Parle Francais</p>
          <p>I Speak English</p>
          <p>я говорю по-русски</p>
        </div>
      </div>
    </>
  )
}

export default App
