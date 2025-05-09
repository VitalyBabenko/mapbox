import { BiError as ErrorIcon } from 'react-icons/bi'

import style from './ErrorMessage.module.scss'

const ErrorMessage = ({ message }) => {
  return (
    <div className={style.error}>
      <ErrorIcon className={style.errorIcon} />
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage
