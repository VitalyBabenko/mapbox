import { Link } from 'react-router-dom'
import { HiHome, HiLogout } from 'react-icons/hi'
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
      <Link to='/account' className={styles.menuItem} onClick={onClose}>
        <FiHome className={styles.menuIcon} />
        <span className={styles.menuText}>My Account</span>
      </Link>
      <Link to='/logout' className={styles.menuItem} onClick={onClose}>
        <IoPowerOutline className={styles.menuIcon} />
        <span className={styles.menuText}>Logout</span>
      </Link>
    </Popup>
  )
}

export default UserMenu
