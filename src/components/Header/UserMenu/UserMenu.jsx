import { FiHome } from 'react-icons/fi'
import { IoPowerOutline } from 'react-icons/io5'
import Popup from '../../Popup'
import styles from './UserMenu.module.scss'

const UserMenu = ({ isOpen, onClose }) => {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title='Manage Profile'
      position='bottom-right'
      className={styles.userMenu}
    >
      <a href='/account' className={styles.menuItem} onClick={onClose}>
        <FiHome className={styles.menuIcon} />
        <span className={styles.menuText}>My Account</span>
      </a>
      <a href='/logout' className={styles.menuItem} onClick={onClose}>
        <IoPowerOutline className={styles.menuIcon} />
        <span className={styles.menuText}>Logout</span>
      </a>
    </Popup>
  )
}

export default UserMenu
