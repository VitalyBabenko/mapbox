import React from 'react'
import { Link } from 'react-router-dom'
import { HiHome, HiLogout } from 'react-icons/hi'
import styles from './UserMenu.module.scss'

const UserMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className={styles.userMenu}>
      <div className={styles.menuHeader}>
        <strong className={styles.menuTitle}>Manage Profile</strong>
        <div className={styles.menuDivider}></div>
      </div>
      <Link to='/account' className={styles.menuItem} onClick={onClose}>
        <HiHome className={styles.menuIcon} />
        <span className={styles.menuText}>My Account</span>
      </Link>
      <Link to='/logout' className={styles.menuItem} onClick={onClose}>
        <HiLogout className={styles.menuIcon} />
        <span className={styles.menuText}>Logout</span>
      </Link>
    </div>
  )
}

export default UserMenu
