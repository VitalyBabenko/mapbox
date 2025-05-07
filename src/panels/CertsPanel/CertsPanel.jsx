import { useEffect, useState } from 'react'
import useDraggable from '../../hooks/useDraggable'
import { useEventStore, useModeStore } from '../../store'
import { plotService } from '../../service/plotService'
import { List } from '../../components'
import style from './CertsPanel.module.scss'
import HeadingSection from '../PlotsPanel/HeadingSection/HeadingSection'
import SpecsSection from '../PlotsPanel/SpecsSection/SpecsSection'
import CertsSection from './CertsSection/CertsSection'
import NotesSection from '../PlotsPanel/NotesSection/NotesSection'
import OwnersSection from '../PlotsPanel/OwnersSection/OwnersSection'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import { convertTimeFormat } from '../../utils/convertTimeFormat'
import DDPSection from '../PlotsPanel/DDPSection/DDPSection'

const CertsPanel = ({ activePlotId }) => {
  const { position, handleMouseDown } = useDraggable({ x: -50, y: 50 })
  const [plotInfo, setPlotInfo] = useState(null)
  const { locale } = useModeStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { setClickedFeature, setClickedPlotInfo } = useEventStore()

  const closePlotPanel = () => setClickedFeature(null)

  useEffect(() => {
    const getData = async () => {
      setError(null)
      setIsLoading(true)
      const info = await plotService.getPlotByEgrId(activePlotId)

      if (info?.error?.message?.length) {
        setError('Building information is unavailable. Please try again later.')
        setIsLoading(false)
        return
      }

      setPlotInfo(info)
      setClickedPlotInfo(info)
      setIsLoading(false)
    }

    if (activePlotId) getData()
  }, [activePlotId])

  if (!activePlotId) return null

  if (error)
    return (
      <div className={style.panel}>
        <ErrorMessage
          message='Plot information is unavailable. Please try again later.'
          onClose={closePlotPanel}
        />
      </div>
    )

  return (
    <div
      className={style.panel}
      style={{
        overflow: isLoading ? 'hidden' : 'auto',
        top: position.y,
        right: -position.x,
      }}
    >
      <HeadingSection
        plotInfo={plotInfo}
        isLoading={isLoading}
        closePlotPanel={closePlotPanel}
        handleMouseDown={handleMouseDown}
      />

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
          Last edits:{' '}
          <b>{convertTimeFormat(plotInfo?.derniere_modification)}</b>
        </p>
      )}
    </div>
  )
}

export default CertsPanel
