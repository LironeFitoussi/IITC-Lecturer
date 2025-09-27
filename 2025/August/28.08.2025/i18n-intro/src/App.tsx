import { Trans } from "react-i18next"
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"
import SwitchLngBtn from "./components/SwitchLngBtn"

function App() {
  const [count, setCount] = useState(0)
  const { i18n } = useTranslation();

  function findUserLanguage(): string {
    const lang = navigator.language;
    if (lang.startsWith('he')) return 'he';
    if (lang.startsWith('fr')) return 'fr';
    if (lang.startsWith('ru')) return 'ru';
    return 'en';
  }


  useEffect(() => {
    // const s = localStorage.getItem('lng');
    // if (s) i18n.changeLanguage(s);

    const userLang = findUserLanguage();
    i18n.changeLanguage(userLang);
  }, []);
  
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
            {t('apple', { count })}
          </span>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => setCount(count > 0 ? count - 1 : 0)}
          >
            -
          </button>
        </div>
        <p>
        <Trans 
        i18nKey={'link'} 
        values={{ 
          here : 'https://react.i18next.com/' 
        }}>
            Click <a className="font-bold underline" href="https://react.i18next.com/">here</a> to learn more.
        </Trans>
        </p>
        <div>
          <h1 className='text-3xl font-bold underline'>{t('greeting', { name: "David" })}</h1>
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
