import { useEffect, useState } from 'react'
import { useEventStore, useModeStore } from '../../store'
import { plotService } from '../../service/plotService'
import { List, Panel } from '../../components'
import style from './CertsPanel.module.scss'
import HeadingSection from '../PlotsPanel/HeadingSection/HeadingSection'
import SpecsSection from '../PlotsPanel/SpecsSection/SpecsSection'
import CertsSection from './CertsSection/CertsSection'
import NotesSection from '../PlotsPanel/NotesSection/NotesSection'
import OwnersSection from '../PlotsPanel/OwnersSection/OwnersSection'
import { convertTimeFormat } from '../../utils/convertTimeFormat'
import DDPSection from '../PlotsPanel/DDPSection/DDPSection'

const CertsPanel = ({ activePlotId }) => {
  const [plotInfo, setPlotInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { locale } = useModeStore()
  const { setClickedFeature, setClickedPlotInfo } = useEventStore()

  const open = !!activePlotId
  const closePanel = () => setClickedFeature(null)

  useEffect(() => {
    const getData = async () => {
      setError(null)
      setLoading(true)
      const info = await plotService.getPlotByEgrId(activePlotId)

      if (info?.error?.message?.length) {
        setError('Building information is unavailable. Please try again later.')
        setLoading(false)
        return
      }

      setPlotInfo(info)
      setClickedPlotInfo(info)
      setLoading(false)
    }

    if (activePlotId) getData()
  }, [activePlotId])

  if (!activePlotId) return null

  return (
    <Panel
      open={open}
      setOpen={closePanel}
      loading={loading}
      error={error}
      heading={<HeadingSection plotInfo={plotInfo} isLoading={loading} />}
      panelPosition={{ x: -50, y: 50 }}
      panelSide='right'
      className={style.certsPanel}
    >
      <SpecsSection plotInfo={plotInfo} locale={locale} />

      <NotesSection plotInfo={plotInfo} />

      <DDPSection info={plotInfo?.ddp} />

      {Array.isArray(plotInfo?.zone) && (
        <List title='Zone:' className={style.zone}>
          {plotInfo?.zone?.map(item => (
            <li key={item} className={style.zoneItem}>
              {item}
            </li>
          ))}
        </List>
      )}

      <CertsSection certs={plotInfo?.construction_certs} />

      <OwnersSection plotInfo={plotInfo} locale={locale} />

      {plotInfo?.derniere_modification && (
        <p className={style.lastEdits}>
          Last edits:
          <b> {convertTimeFormat(plotInfo?.derniere_modification)}</b>
        </p>
      )}
    </Panel>
  )
}

export default CertsPanel
