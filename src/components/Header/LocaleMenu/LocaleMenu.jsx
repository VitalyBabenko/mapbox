import React, { useState, useRef, useEffect } from 'react'
import Popup from '../../Popup'
import styles from './LocaleMenu.module.scss'
import enFlag from '../../../assets/svg/great-britain-flag.svg'
import frFlag from '../../../assets/svg/france-flag.svg'
import { Link } from 'react-router-dom'
import { useLocale } from '@/hooks'

const LocaleMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { locale, t } = useLocale('header')

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
    { code: 'en', name: t('languages.english'), flag: enFlag, link: '/lang/en' },
    { code: 'fr', name: t('languages.french'), flag: frFlag, link: '/lang/fr' },
  ]

  const currentLang = languages.find(lang => lang.code === locale)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.localeMenu} ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={styles.localeToggle}
        aria-label={t('userMenu.selectLanguage')}
      >
        <img
          src={currentLang.flag}
          alt={currentLang.name}
          className={styles.flag}
        />
        <span className={styles.languageName}>{currentLang.name}</span>
      </button>

      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position='bottom-right'
        className={styles.dropdown}
      >
        {languages.map(language => (
          <a
            key={language.code}
            href={language.link}
            className={`${styles.languageOption} ${
              language.code === currentLang ? styles.active : ''
            }`}
          >
            <img
              src={language.flag}
              alt={language.name}
              className={styles.flag}
            />
            <span className={styles.languageName}>{language.name}</span>
          </a>
        ))}
      </Popup>
    </div>
  )
}

export default LocaleMenu
