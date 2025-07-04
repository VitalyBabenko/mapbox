import React from 'react'
import style from './Tooltip.module.scss'

const Tooltip = props => {
  const { children, text, top, left, right, bottom } = props

  const textPosition = {
    top,
    left,
    right,
    bottom,
  }

  if (!left && !right) {
    textPosition.left = '50%'
    textPosition.transform = 'translateX(-50%)'
  }
  const formattedText = text ? text.replace(/\n/g, '<br />') : ''

  return (
    <div className={style.tooltipWrapper}>
      <div className={style.childrenWrapper}>{children}</div>
      <p
        className={style.text}
        style={textPosition}
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />
    </div>
  )
}

export default Tooltip
