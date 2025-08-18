import React from 'react'
import { HiMoon, HiSun } from 'react-icons/hi'
import { useLocalStorage } from '@hooks'
import styles from './ThemeToggler.module.scss'

const ThemeToggler = () => {
  const [currentSkin, setCurrentSkin] = useLocalStorage(
    'light-layout-current-skin',
    'light-layout',
  )
  const [prevSkin, setPrevSkin] = useLocalStorage(
    'light-layout-prev-skin',
    'light-layout',
  )

  const isDarkTheme = currentSkin === 'dark-layout'

  const handleToggle = () => {
    const newSkin = isDarkTheme ? 'light-layout' : 'dark-layout'

    setPrevSkin(currentSkin)
    setCurrentSkin(newSkin)
  }

  return (
    <button
      onClick={handleToggle}
      className={styles.themeToggle}
      aria-label='Toggle theme'
    >
      {isDarkTheme ? (
        <HiSun className={styles.themeIcon} />
      ) : (
        <HiMoon className={styles.themeIcon} />
      )}
    </button>
  )
}

export default ThemeToggler
