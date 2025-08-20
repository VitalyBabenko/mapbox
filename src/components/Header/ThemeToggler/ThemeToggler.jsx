import React from 'react'
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5'
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
        <IoSunnyOutline className={styles.themeIcon} size={21} />
      ) : (
        <IoMoonOutline className={styles.themeIcon} size={21} />
      )}
    </button>
  )
}

export default ThemeToggler
