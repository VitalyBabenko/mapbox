import style from './MapDataPanel.module.scss'
import { VscMap as MapDataIcon } from 'react-icons/vsc'
import { FaMap as MapDataBlackIcon } from 'react-icons/fa'
import { memo, useState } from 'react'
import BasemapSection from './BasemapSection/BasemapSection'
import CharacteristicsSection from './CharacteristicsSection/CharacteristicsSection'
import ZonesSection from './ZonesSection/ZonesSection'
import ProtectedSection from './ProtectedSection/ProtectedSection'
import { useModeStore } from '../../store'
import OpacitySection from './OpacitySection/OpacitySection'
import MyMapsSection from './MyMapsSection/MyMapsSection'
import { Panel } from '../../components'
import { useLocale } from '../../hooks/useLocale'

const MapDataPanel = () => {
  const { t } = useLocale('panels.mapData')
  const [open, setOpen] = useState(false)
  const { county } = useModeStore()

  const heading = (
    <>
      <MapDataBlackIcon size={20} />
      <h2>{t('title')}</h2>
    </>
  )

  return (
    <Panel
      open={open}
      setOpen={setOpen}
      heading={heading}
      buttonIcon={<MapDataIcon size={20} />}
      buttonText={t('title')}
      buttonPosition={{ top: 10, right: 50 }}
      panelPosition={{ x: -50, y: 10 }}
      panelSide='right'
      className={style.mapsDataPanel}
    >
      <BasemapSection />
      <MyMapsSection />
      <ProtectedSection />
      <ZonesSection />
      {county ? <CharacteristicsSection /> : null}
      <OpacitySection />
    </Panel>
  )
}

export default memo(MapDataPanel)
