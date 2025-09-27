import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <span>{t('language')}: </span>
        <button onClick={() => changeLanguage('en')} style={{ marginRight: '5px' }}>
          {t('english')}
        </button>
        <button onClick={() => changeLanguage('fr')}>
          {t('french')}
        </button>
      </div>
      
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{t('title')}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {t('count_button', { count })}
        </button>
        <p>
          {t('edit_text')}
        </p>
      </div>
      <p className="read-the-docs">
        {t('learn_more')}
      </p>
      <p style={{ marginTop: '20px', fontSize: '18px', color: '#646cff' }}>
        {t('welcome')}
      </p>
    </>
  )
}

export default App
