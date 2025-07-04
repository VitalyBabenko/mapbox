import style from './BasemapSection.module.scss'
import { MAP_STYLES } from '../../../constants'
import { useMap } from 'react-map-gl'
import { useModeStore } from '../../../store'
import { useLocale } from '../../../hooks/useLocale'

const BasemapSection = () => {
  const { t } = useLocale('panels.mapData')
  const { current: map } = useMap()
  const { mapStyle, setMapStyle } = useModeStore()

  const toggleMapStyle = style => {
    setMapStyle(style)
    const fullMap = map.getMap()
    fullMap.setStyle(style.url)
  }

  return (
    <>
      <h3 className={style.title}>{t('basemap')}</h3>
      <ul className={style.list}>
        {MAP_STYLES.map(styleItem => (
          <li
            key={styleItem.url}
            onClick={() => toggleMapStyle(styleItem)}
            className={mapStyle.url === styleItem.url ? style.active : null}
          >
            <img src={styleItem.image} alt={`${styleItem.title} map style`} />
            <span>{styleItem.title}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default BasemapSection
