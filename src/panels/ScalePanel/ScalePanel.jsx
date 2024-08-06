import style from './ScalePanel.module.scss'
import { usePaintStore } from '../../store'
import { DEFAULT_PAINT } from '../../constants'

const ScalePanel = () => {
  const { activePaint } = usePaintStore(state => state)
  const isOpen = activePaint !== DEFAULT_PAINT

  const getItems = () => {
    if (Array.isArray(activePaint['fill-color'])) {
      const colors = activePaint['fill-color']
        .filter(item => {
          if (item === 'match') return false
          if (Array.isArray(item)) return false
          return true
        })
        .filter(item => item !== null)

      const result = colors
        .map((item, index) => {
          if (!(index % 2)) {
            return {
              name: item,
              color: colors[index + 1],
            }
          }
          return null
        })
        .filter(item => item)
        .slice(0, -1)

      return result
    }

    if (activePaint?.['fill-color']?.stops?.length) {
      return activePaint['fill-color'].stops.map(item => ({
        name: `${item[0]} unit(s)`,
        color: item[1],
      }))
    }

    return []
  }

  if (activePaint === DEFAULT_PAINT) return null
  if (getItems() === null) return null
  return (
    <div className={isOpen ? style.panel : style.hidden}>
      <ul>
        {getItems().map(item => (
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
