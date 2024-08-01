import style from './MapDataPanel.module.scss'
import { VscMap as MapDataIcon } from 'react-icons/vsc'
import { FaMap as MapDataBlackIcon } from 'react-icons/fa'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import { MAP_STYLES } from '../../constants'
import { useState } from 'react'

const MapDataPanel = ({ mapStyle, mapRef }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [activeStyle, setActiveStyle] = useState(MAP_STYLES[0])
  const openPanel = () => setIsPanelOpen(true)
  const closePanel = () => setIsPanelOpen(false)

  const toggleMapStyle = style => {
    const map = mapRef.current.getMap()
    map.setStyle(style.URL)
    setActiveStyle(style)
  }

  return (
    <>
      <button onClick={openPanel} className={style.openButton}>
        <MapDataIcon size={24} />
        Maps & Data
      </button>

      {isPanelOpen && (
        <div className={style.panel}>
          <div className={style.heading}>
            <MapDataBlackIcon size={20} />
            <h2>Maps & Data</h2>
            <CrossIcon
              size={20}
              onClick={closePanel}
              className={style.crossIcon}
            />
          </div>

          <h3>Basemap</h3>

          <ul>
            {MAP_STYLES.map(STYLE => (
              <li
                key={STYLE.URL}
                onClick={() => toggleMapStyle(STYLE)}
                className={activeStyle.URL === STYLE.URL ? style.active : null}
              >
                <img src={STYLE.IMAGE} alt={`${STYLE.TITLE} map style`} />
                <span>{STYLE.TITLE}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default MapDataPanel
