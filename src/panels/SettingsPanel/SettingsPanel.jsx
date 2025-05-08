import { useState } from 'react'

import { TbSettings2 as SettingsIcon } from 'react-icons/tb'
import { RiSettingsFill as SettingsBlackIcon } from 'react-icons/ri'
import { RiDraggable as DraggableIcon } from 'react-icons/ri'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'

import style from './SettingsPanel.module.scss'
import { Tooltip } from '../../components'
import useDraggable from '../../hooks/useDraggable'
import BasemapSection from '../MapDataPanel/BasemapSection/BasemapSection'
import ProtectedSection from '../MapDataPanel/ProtectedSection/ProtectedSection'
import ZonesSection from '../MapDataPanel/ZonesSection/ZonesSection'
import OpacitySection from '../MapDataPanel/OpacitySection/OpacitySection'
import MyMapsSection from '../MapDataPanel/MyMapsSection/MyMapsSection'

const SettingsPanel = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const openPanel = () => setIsPanelOpen(true)
  const closePanel = () => setIsPanelOpen(false)
  const { position, handleMouseDown } = useDraggable({ x: -50, y: 10 })

  if (!isPanelOpen) {
    return (
      <button onClick={openPanel} className={style.openButton}>
        <SettingsIcon size={24} />
        Settings
      </button>
    )
  }

  return (
    <div
      className={style.panel}
      style={{ top: position.y, right: -position.x }}
    >
      <div className={style.heading}>
        <SettingsBlackIcon size={20} />
        <h2>Settings</h2>

        <Tooltip text='Move the panel' bottom='-40px'>
          <DraggableIcon
            className={style.draggableIcon}
            onMouseDown={handleMouseDown}
          />
        </Tooltip>

        <CrossIcon onClick={closePanel} className={style.crossIcon} />
      </div>

      <BasemapSection />

      <MyMapsSection />

      <ProtectedSection />

      <ZonesSection />

      <OpacitySection title='Visibility' />
    </div>
  )
}

export default SettingsPanel
