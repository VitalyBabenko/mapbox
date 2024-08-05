import style from './ScalePanel.module.scss'
import { usePaintStore } from '../../store'
import { DEFAULT_PAINT } from '../../constants'

const ScalePanel = () => {
  const { activePaint } = usePaintStore(state => state)
  const isOpen = activePaint !== DEFAULT_PAINT

  const items = activePaint['fill-color']?.stops?.map(item => {
    return {
      name: item[0],
      color: item[1],
    }
  })

  console.log(items)

  if (activePaint === DEFAULT_PAINT) return null

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
