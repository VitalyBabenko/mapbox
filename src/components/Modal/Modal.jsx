import { useEffect, useRef, useState } from 'react'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import style from './Modal.module.scss'
import ConfirmDialog from './ConfirmDialog'

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  className = '',
  hasUnsavedChanges,
}) => {
  const ref = useRef(null)
  const [isClickStartedInModal, setIsClickStartedInModal] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleModalMouseDown = e => {
    e.stopPropagation()
    setIsClickStartedInModal(true)
  }

  const handleOverlayMouseDown = e => {
    e.stopPropagation()
    setIsClickStartedInModal(false)
  }

  const handleOverlayClick = e => {
    if (isClickStartedInModal) {
      setIsClickStartedInModal(false)
      return
    }

    // Check for unsaved changes if function provided
    if (hasUnsavedChanges && hasUnsavedChanges()) {
      setShowConfirmDialog(true)
    } else {
      onClose()
    }
  }

  const handleConfirmClose = () => {
    setShowConfirmDialog(false)
    onClose()
  }

  const handleCancelClose = () => {
    setShowConfirmDialog(false)
  }

  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') {
        // Check for unsaved changes if function provided
        if (hasUnsavedChanges && hasUnsavedChanges()) {
          setShowConfirmDialog(true)
        } else {
          onClose()
        }
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
    <>
      <div
        ref={ref}
        className={style.overlay}
        onClick={handleOverlayClick}
        onMouseDown={handleOverlayMouseDown}
      >
        <div
          className={modalClassName}
          onMouseDown={handleModalMouseDown}
          onClick={e => e.stopPropagation()}
        >
          <div className={style.header}>
            {title && <h2 className={style.title}>{title}</h2>}
            <button className={style.closeButton} onClick={onClose}>
              <CrossIcon size={20} />
            </button>
          </div>
          <div className={style.content}>{children}</div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onConfirm={handleConfirmClose}
        onCancel={handleCancelClose}
        title='Unsaved Changes'
        message='You have unsaved filter changes. Are you sure you want to close without saving?'
      />
    </>
  )
}

export default Modal
