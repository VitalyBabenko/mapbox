import style from './MapDataPanel.module.scss'
import { VscMap as MapDataIcon } from 'react-icons/vsc'
import { FaMap as MapDataBlackIcon } from 'react-icons/fa'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import { useState } from 'react'
import BasemapSection from './BasemapSection/BasemapSection'
import CharacteristicsSection from './CharacteristicsSection/CharacteristicsSection'

const MapDataPanel = ({ mapRef }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const openPanel = () => setIsPanelOpen(true)
  const closePanel = () => setIsPanelOpen(false)

  if (!isPanelOpen) {
    return (
      <button onClick={openPanel} className={style.openButton}>
        <MapDataIcon size={24} />
        Maps & Data
      </button>
    )
  }

  return (
    <div className={style.panel}>
      <div className={style.heading}>
        <MapDataBlackIcon size={20} />
        <h2>Maps & Data</h2>
        <CrossIcon size={20} onClick={closePanel} className={style.crossIcon} />
      </div>

      <BasemapSection />
      <CharacteristicsSection />
    </div>
  )
}

export default MapDataPanel
