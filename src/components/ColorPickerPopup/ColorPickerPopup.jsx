import React, { useEffect, useRef, useState } from 'react'
import style from './ColorPickerPopup.module.scss'
import { HexColorPicker } from 'react-colorful'
import { DEFAULT_TAG_COLORS } from '../../constants'
import { RiColorFilterLine as ColorIcon } from 'react-icons/ri'

const ColorPickerPopup = ({ color, onChange }) => {
  const popover = useRef()
  const [isOpen, toggle] = useState(false)
  const isDefaultColor = DEFAULT_TAG_COLORS.includes(color)

  useEffect(() => {
    const handleClickOutside = event => {
      if (popover.current && !popover.current.contains(event.target)) {
        if (isOpen) {
          toggle(false)
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  return (
    <div className={style.picker}>
      <div
        className={style.swatch}
        style={{ backgroundColor: isDefaultColor ? 'white' : color }}
        onClick={() => toggle(true)}
      >
        {isDefaultColor && <ColorIcon className={style.icon} />}
      </div>

      {isOpen && (
        <div className={style.popover} ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  )
}

export default ColorPickerPopup
