import style from './Toast.module.scss'
import { useToastStore } from '../../store'
import { IoClose as CrossIcon } from 'react-icons/io5'
import { BiCheck as CheckIcon } from 'react-icons/bi'

const Toast = () => {
  const toast = useToastStore(state => state)
  const toastClassName = `${style.toast} ${toast.open ? '' : style.hidden}`

  return (
    <div className={toastClassName}>
      {toast.message}

      {toast.status === 'success' && (
        <div className={style.success}>
          <CheckIcon />
        </div>
      )}

      {toast.status === 'error' && (
        <div className={style.error}>
          <CrossIcon />
        </div>
      )}
    </div>
  )
}

export default Toast
