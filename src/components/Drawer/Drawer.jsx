import { useEffect, useState } from 'react'
import style from './Drawer.module.scss'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'

const Drawer = ({ icon, title, children, isOpen, onClose }) => {
  const [animateOpen, setAnimateOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setAnimateOpen(true)
      })
    } else {
      setAnimateOpen(false)
    }
  }, [isOpen])

  return (
    <div
      className={`${style.drawer} ${animateOpen ? style.open : style.close}`}
    >
      <div className={style.drawerHead}>
        {icon && <div className={style.icon}>{icon}</div>}
        <h3 className={style.title}>{title}</h3>

        <div className={style.actions}>
          <button className={style.closeBtn} onClick={onClose}>
            <CrossIcon size={22} className={style.crossIcon} />
          </button>
        </div>
      </div>

      <div className={style.drawerContent}>{children}</div>
    </div>
  )
}

export default Drawer
