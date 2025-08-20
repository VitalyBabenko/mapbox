import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoLanguage as LanguageIcon } from 'react-icons/io5'
import UserMenu from './UserMenu/UserMenu'
import ThemeToggler from './ThemeToggler/ThemeToggler'
import Search from './Search/Search'
import { FiltersButton } from '../Filters'
import styles from './Header.module.scss'

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const userMenuRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleClickOutside = event => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'fr' : 'en')
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.leftSection}>
          <div className={styles.searchFiltersGroup}>
            <Search />
            <FiltersButton
              filtersFor='plots'
              className={styles.filtersButton}
            />
          </div>

          <Link
            to='/explore/table/plots'
            className={`${styles.tableViewButton} ${
              location.pathname === '/explore/table/plots' ? styles.active : ''
            }`}
          >
            Table view
          </Link>

          <button className={styles.mapViewButton}>Map view</button>
        </div>

        <div className={styles.rightSection}>
          <button
            onClick={toggleLanguage}
            className={styles.languageToggle}
            aria-label='Toggle language'
          >
            <LanguageIcon className={styles.languageIcon} />
          </button>

          <ThemeToggler />

          <div className={styles.userSection} ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className={styles.avatarButton}
              aria-label='User menu'
            >
              <div className={styles.avatar}>
                <span className={styles.onlineDot}></span>
              </div>
            </button>

            <UserMenu
              isOpen={isUserMenuOpen}
              onClose={() => setIsUserMenuOpen(false)}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
