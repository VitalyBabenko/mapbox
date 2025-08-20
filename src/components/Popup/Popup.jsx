import React from 'react'
import styles from './Popup.module.scss'

const Popup = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  position = 'bottom-right',
  className = '',
  ...props 
}) => {
  if (!isOpen) return null

  return (
    <div className={`${styles.popup} ${styles[position]} ${className}`} {...props}>
      {title && (
        <div className={styles.popupHeader}>
          <strong className={styles.popupTitle}>{title}</strong>
          <div className={styles.popupDivider}></div>
        </div>
      )}
      <div className={styles.popupContent}>
        {children}
      </div>
    </div>
  )
}

export default Popup
