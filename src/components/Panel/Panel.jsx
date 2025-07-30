import { useDraggable } from '../../hooks'
import style from './Panel.module.scss'
import Tooltip from '../Tooltip/Tooltip'
import { RiDraggable as DraggableIcon } from 'react-icons/ri'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import { memo } from 'react'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Loader from '../Loader/Loader'

const Panel = props => {
  const {
    open,
    setOpen,
    className,
    error,
    loading,
    panelPosition = { x: 10, y: 50 },
    panelSide = 'left',
    children,
    heading,
    buttonIcon,
    buttonText,
    buttonPosition = { top: 0, left: 0, right: 0, bottom: 0 },
  } = props
  const { position, handleMouseDown } = useDraggable(panelPosition)

  const panelInlineStyle = {
    top: position.y,
    left: panelSide === 'left' ? position.x : 'unset',
    right: panelSide === 'right' ? -position.x : 'unset',
  }

  const buttonInlineStyle = {
    top: buttonPosition.top,
    left: buttonPosition.left,
    right: buttonPosition.right,
    bottom: buttonPosition.bottom,
  }

  if (!open) {
    if (!buttonIcon || !buttonText) {
      return null
    }

    return (
      <button
        className={style.button}
        style={buttonInlineStyle}
        onClick={() => setOpen(true)}
      >
        {buttonIcon}
        {buttonText}
      </button>
    )
  }

  const getContent = () => {
    if (error) return <ErrorMessage message={error} />
    if (loading) return <Loader />
    return children
  }

  return (
    <div className={`${style.panel} ${className}`} style={panelInlineStyle}>
      <div className={style.heading}>
        {error ? <h2>Error</h2> : heading}

        <div className={style.controls}>
          <Tooltip text='Move the panel' bottom='-40px'>
            <DraggableIcon
              size={24}
              className={style.draggableIcon}
              onMouseDown={handleMouseDown}
            />
          </Tooltip>

          <CrossIcon
            size={24}
            className={style.crossIcon}
            onClick={() => setOpen(false)}
          />
        </div>
      </div>

      {getContent()}
    </div>
  )
}

export default Panel
