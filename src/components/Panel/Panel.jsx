import { useState } from 'react'
import useDraggable from '../../hooks/useDraggable'
import style from './Panel.module.scss'
import Tooltip from '../Tooltip/Tooltip'
import { RiDraggable as DraggableIcon } from 'react-icons/ri'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'

const Panel = props => {
  const {
    initialPosition = { x: 10, y: 50 },
    children,
    heading,
    buttonIcon,
    buttonText,
    buttonPosition = { top: 0, left: 0 },
  } = props

  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { position, handleMouseDown } = useDraggable(initialPosition)

  const openPanel = () => setOpen(true)
  const closePanel = () => setOpen(false)
  const togglePanel = () => setOpen(prev => !prev)

  const panelPosition = {
    top: position.y,
    left: position.x,
  }

  const buttonPositionStyle = {
    top: buttonPosition.top,
    left: buttonPosition.left,
  }

  if (!open) {
    return (
      <button
        className={style.button}
        style={buttonPositionStyle}
        onClick={openPanel}
      >
        {buttonIcon}
        {buttonText}
      </button>
    )
  }

  return (
    <div className={style.panel} style={panelPosition}>
      <div className={style.heading}>
        <div className={style.title}>{heading}</div>

        <Tooltip text='Move the panel' bottom='-40px'>
          <DraggableIcon
            size={24}
            className={style.draggableIcon}
            onMouseDown={handleMouseDown}
          />
        </Tooltip>

        <CrossIcon size={24} className={style.closeBtn} onClick={closePanel} />
      </div>

      {typeof children === 'function'
        ? children({
            openPanel,
            closePanel,
            togglePanel,
            error,
            setError,
            loading,
            setLoading,
          })
        : children}
    </div>
  )
}

export default Panel
