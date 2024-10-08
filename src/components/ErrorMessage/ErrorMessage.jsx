import { BiError as ErrorIcon } from 'react-icons/bi'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'

import style from './ErrorMessage.module.scss'

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className={style.error}>
      {onClose && <CrossIcon className={style.closeIcon} onClick={onClose} />}
      <ErrorIcon className={style.errorIcon} />
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage
