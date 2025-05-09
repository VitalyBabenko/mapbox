import { useState } from 'react'

import { TbSettings2 as SettingsIcon } from 'react-icons/tb'
import { RiSettingsFill as SettingsBlackIcon } from 'react-icons/ri'
import style from './SettingsPanel.module.scss'
import { Panel } from '../../components'
import BasemapSection from '../MapDataPanel/BasemapSection/BasemapSection'
import ProtectedSection from '../MapDataPanel/ProtectedSection/ProtectedSection'
import ZonesSection from '../MapDataPanel/ZonesSection/ZonesSection'
import OpacitySection from '../MapDataPanel/OpacitySection/OpacitySection'
import MyMapsSection from '../MapDataPanel/MyMapsSection/MyMapsSection'

const SettingsPanel = () => {
  const [open, setOpen] = useState()

  const heading = (
    <>
      <SettingsBlackIcon size={20} />
      <h2>Settings</h2>
    </>
  )

  return (
    <Panel
      open={open}
      setOpen={setOpen}
      heading={heading}
      buttonIcon={<SettingsIcon size={20} />}
      buttonText='Settings'
      buttonPosition={{ top: 10, right: 50 }}
      panelPosition={{ x: -50, y: 10 }}
      panelSide='right'
      className={style.settingsPanel}
    >
      <BasemapSection />
      <MyMapsSection />
      <ProtectedSection />
      <ZonesSection />
      <OpacitySection title='Visibility' />
    </Panel>
  )
}

export default SettingsPanel
