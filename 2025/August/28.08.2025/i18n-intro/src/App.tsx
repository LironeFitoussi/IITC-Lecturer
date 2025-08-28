import { useTranslation } from "react-i18next"

function App() {
  const { t } = useTranslation()
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
        <p>{t('baba')}</p>
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
