import style from './ScalePanel.module.scss'
import { usePaintStore, useZoneStore } from '../../store'
import { DEFAULT_PAINT, PAINT_BY_ZONE } from '../../constants'

const ScalePanel = () => {
  const { activePaint } = usePaintStore()
  const { isScaleActive, isActive: isZoneActive } = useZoneStore()
  const isOpen =
    activePaint !== DEFAULT_PAINT || (isScaleActive && isZoneActive)

  const items = isScaleActive
    ? PAINT_BY_ZONE.getItems()
    : activePaint.getItems()

  return (
    <div className={isOpen ? style.panel : style.hidden}>
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

export default ScalePanel
