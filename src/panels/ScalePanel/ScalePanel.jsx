import style from './ScalePanel.module.scss'
import { usePaintStore, useZoneStore } from '../../store'
import { DEFAULT_PAINT, PAINT_BY_ZONE } from '../../constants'
import { memo } from 'react'
import useDraggable from '../../hooks/useDraggable'

const ScalePanel = () => {
  const { position, handleMouseDown } = useDraggable({ x: -401, y: 10 })
  const { activePaint } = usePaintStore()
  const { isActive: isZonesActive, isPrimary: isZonesPrimary } = useZoneStore()
  const isOpen =
    activePaint !== DEFAULT_PAINT || (isZonesActive && isZonesPrimary)

  const items =
    isZonesPrimary && isZonesActive
      ? PAINT_BY_ZONE.getItems()
      : activePaint.getItems()

  return (
    <div
      style={{ top: position.y, right: -position.x }}
      className={isOpen ? style.panel : style.hidden}
      onMouseDown={handleMouseDown}
    >
      <ul>
        {items.map(item => (
          <li key={item.name}>
            <p>{item.name}</p>
            <span style={{ backgroundColor: item.color }} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default memo(ScalePanel)
