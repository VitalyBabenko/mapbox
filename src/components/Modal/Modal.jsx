import { memo, useEffect } from 'react'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import style from './Modal.module.scss'

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  className = '',
}) => {
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keyup', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keyup', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const modalClassName = `${style.modal} ${style[size]} ${className}`

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={modalClassName} onClick={e => e.stopPropagation()}>
        <div className={style.header}>
          {title && <h2 className={style.title}>{title}</h2>}
          <button className={style.closeButton} onClick={onClose}>
            <CrossIcon size={20} />
          </button>
        </div>
        <div className={style.content}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default memo(Modal)
