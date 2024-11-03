import style from './MapDataPanel.module.scss'
import { VscMap as MapDataIcon } from 'react-icons/vsc'
import { FaMap as MapDataBlackIcon } from 'react-icons/fa'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import { memo, useState } from 'react'
import BasemapSection from './BasemapSection/BasemapSection'
import CharacteristicsSection from './CharacteristicsSection/CharacteristicsSection'
import ScalePanel from '../ScalePanel/ScalePanel'
import ZonesSection from './ZonesSection/ZonesSection'
import ProtectedSection from './ProtectedSection/ProtectedSection'
import { useModeStore } from '../../store'
import useDraggable from '../../hooks/useDraggable'
import Tooltip from '../../components/Tooltip/Tooltip'
import { RiDraggable as DraggableIcon } from 'react-icons/ri'
import OpacitySection from './OpacitySection/OpacitySection'

const MapDataPanel = () => {
  const { position, handleMouseDown } = useDraggable({ x: -50, y: 10 })
  const { county } = useModeStore()
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
    <>
      <div
        className={style.panel}
        style={{ top: position.y, right: -position.x }}
      >
        <div className={style.heading}>
          <MapDataBlackIcon size={20} />
          <h2>Maps & Data</h2>

          <Tooltip text='Move the panel' bottom='-40px'>
            <DraggableIcon
              className={style.draggableIcon}
              onMouseDown={handleMouseDown}
            />
          </Tooltip>

          <CrossIcon onClick={closePanel} className={style.crossIcon} />
        </div>

        <BasemapSection />

        <ProtectedSection />

        <ZonesSection />

        {county ? <CharacteristicsSection /> : null}

        <OpacitySection />
      </div>
      <ScalePanel />
    </>
  )
}

export default memo(MapDataPanel)
