import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import { GrCircleAlert as AlertIcon } from 'react-icons/gr'
import style from './ConfirmDialog.module.scss'

const ConfirmDialog = ({ isOpen, onConfirm, onCancel, title, message }) => {
  if (!isOpen) return null

  return (
    <div className={style.overlay} onClick={onCancel}>
      <div className={style.modal} onClick={e => e.stopPropagation()}>
        <div className={style.header}>
          <h2 className={style.title}>
            <AlertIcon />
            {title}
          </h2>
          <button className={style.closeButton} onClick={onCancel}>
            <CrossIcon size={20} />
          </button>
        </div>

        <div className={style.content}>
          <p className={style.message}>{message}</p>

          <div className={style.buttons}>
            <button className={style.cancelButton} onClick={onCancel}>
              Keep Editing
            </button>
            <button className={style.confirmButton} onClick={onConfirm}>
              Close Without Saving
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
