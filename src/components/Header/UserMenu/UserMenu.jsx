import { FiHome } from 'react-icons/fi'
import { IoPowerOutline } from 'react-icons/io5'
import Popup from '../../Popup'
import { useLocale } from '@/hooks'
import styles from './UserMenu.module.scss'

const UserMenu = ({ isOpen, onClose }) => {
  const { t } = useLocale('header')

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title={t('userMenu.title')}
      position='bottom-right'
      className={styles.userMenu}
    >
      <a href='/account' className={styles.menuItem} onClick={onClose}>
        <FiHome className={styles.menuIcon} />
        <span className={styles.menuText}>{t('userMenu.myAccount')}</span>
      </a>
      <a href='/logout' className={styles.menuItem} onClick={onClose}>
        <IoPowerOutline className={styles.menuIcon} />
        <span className={styles.menuText}>{t('userMenu.logout')}</span>
      </a>
    </Popup>
  )
}

export default UserMenu
