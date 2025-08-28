import { useTranslation } from "react-i18next"

export default function SwitchLngBtn() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    }

    return (
        <div>
            <p>Choose You Language</p>
            <button onClick={() => changeLanguage('en')}>EN</button>
            <button onClick={() => changeLanguage('fr')}>FR</button>
            <button onClick={() => changeLanguage('ru')}>RU</button>
            <button onClick={() => changeLanguage('he')}>HE - עברית</button>
        </div>
    )
}