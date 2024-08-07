import style from './ScalePanel.module.scss'
import { usePaintStore } from '../../store'
import { DEFAULT_PAINT } from '../../constants'

const ScalePanel = () => {
  const { activePaint } = usePaintStore(state => state)
  const isOpen = activePaint !== DEFAULT_PAINT

  if (activePaint === DEFAULT_PAINT) return null
  if (!activePaint.getItems().length) return null
  return (
    <div className={isOpen ? style.panel : style.hidden}>
      <ul>
        {activePaint.getItems().map(item => (
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
