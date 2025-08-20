import React, { useState, useRef, useEffect } from 'react'
import { IoLanguage as LanguageIcon } from 'react-icons/io5'
import styles from './LocaleMenu.module.scss'
import enFlag from '../../../assets/svg/great-britain-flag.svg'
import frFlag from '../../../assets/svg/france-flag.svg'

const LocaleMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const languages = [
    { code: 'en', name: 'English', flag: enFlag },
    { code: 'fr', name: 'French', flag: frFlag },
  ]

  const currentLang = languages.find(lang => lang.code === currentLanguage)

  const handleLanguageChange = languageCode => {
    setCurrentLanguage(languageCode)
    setIsOpen(false)
    // Here you can add logic to change the app language
    document.documentElement.lang = languageCode
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.localeMenu} ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={styles.localeToggle}
        aria-label='Select language'
      >
        <img
          src={currentLang.flag}
          alt={currentLang.name}
          className={styles.flag}
        />
        <span className={styles.languageName}>{currentLang.name}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map(language => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`${styles.languageOption} ${
                language.code === currentLanguage ? styles.active : ''
              }`}
            >
              <img
                src={language.flag}
                alt={language.name}
                className={styles.flag}
              />
              <span className={styles.languageName}>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LocaleMenu
