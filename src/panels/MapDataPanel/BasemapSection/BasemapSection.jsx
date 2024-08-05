import { useState } from 'react'
import style from './BasemapSection.module.scss'
import { MAP_STYLES } from '../../../constants'
import { useMap } from 'react-map-gl'

const BasemapSection = () => {
  const { current: map } = useMap()
  const [activeStyle, setActiveStyle] = useState(MAP_STYLES[0])

  const toggleMapStyle = style => {
    const fullMap = map.getMap()
    fullMap.setStyle(style.url)
    setActiveStyle(style)
  }

  return (
    <>
      <h3>Basemap</h3>
      <ul className={style.mapStyles}>
        {MAP_STYLES.map(mapStyle => (
          <li
            key={mapStyle.url}
            onClick={() => toggleMapStyle(mapStyle)}
            className={activeStyle.url === mapStyle.url ? style.active : null}
          >
            <img src={mapStyle.image} alt={`${mapStyle.title} map style`} />
            <span>{mapStyle.title}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default BasemapSection
