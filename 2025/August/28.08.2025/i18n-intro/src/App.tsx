import { useTranslation } from "react-i18next"
import { useState } from "react"
import SwitchLngBtn from "./components/SwitchLngBtn"

function App() {
  const [count, setCount] = useState(0)


  const { t } = useTranslation()
  return (
    <>
      <SwitchLngBtn />
      <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
        <p>{t('baba')}</p>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 bg-green-500 text-white rounded"
            onClick={() => setCount(count + 1)}
          >
            +
          </button>
          <span> 
            { t('apple', { count })}
          </span>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => setCount(count > 0 ? count - 1 : 0)}
          >
            -
          </button>
        </div>
        <div>
          <h1 className='text-3xl font-bold underline'>{t('greeting', { name: "David"})}</h1>
          <p>{t('sorry')}</p>
        </div>
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
