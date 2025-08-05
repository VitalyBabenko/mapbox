import { useVisibleFeatures } from '../../hooks'
import style from './Sidebar.module.scss'

const Sidebar = () => {
  //   const { features, isLoading } = useVisibleFeatures()

  return (
    <div
      className={style.sidebar}
      style={{ padding: '10px', width: '250px', overflowY: 'auto' }}
    >
      <h3>Test</h3>
      {/* {features.length === 0 && <p>Нет данных</p>} */}
      {/* <ul>
        {features.map(f => (
          <li key={f.properties.EGRID}>{f.properties.EGRID || 'Без ID'}</li>
        ))}
      </ul> */}
    </div>
  )
}

export default Sidebar
