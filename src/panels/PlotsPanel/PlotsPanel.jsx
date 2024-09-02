import { memo, useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import SpecsSection from './SpecsSection/SpecsSection'
import style from './PlotsPanel.module.scss'
import AddressesSection from './AddressesSection/AddressesSection'
import OwnersSection from './OwnersSection/OwnersSection'
import TransactionsSection from './TransactionsSection/TransactionsSection'
import NotesSection from './NotesSection/NotesSection'
import { convertTimeFormat } from '../../utils/convertTimeFormat'
import BuildingPermitsSection from './BuildingPermitsSection/BuildingPermitsSection'
import List from '../../components/List/List'
import { plotService } from '../../service/plotService'
import { useEventStore } from '../../store'
import HeadingSection from './HeadingSection/HeadingSection'

const PlotsPanel = ({ activePlotId }) => {
  const [plotInfo, setPlotInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { setClickedFeature } = useEventStore()

  const closePlotPanel = () => setClickedFeature(null)

  useEffect(() => {
    const getData = async () => {
      setError(null)
      setIsLoading(true)
      const info = await plotService.getPlotByEgrId(activePlotId)

      console.log(info)

      if (info?.error?.message?.length) {
        setError('Building information is unavailable. Please try again later.')
        setIsLoading(false)
        return
      }

      setPlotInfo(info)
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
      style={{ overflow: isLoading ? 'hidden' : 'auto' }}
    >
      {isLoading && (
        <div className={style['loader-drawer']}>
          <Loader />
        </div>
      )}

      <HeadingSection
        plotInfo={plotInfo}
        isLoading={isLoading}
        closePlotPanel={closePlotPanel}
      />

      {plotInfo?.commune_name && (
        <p className={style.commune}>
          Commune: <span>{plotInfo.commune_name}</span>
        </p>
      )}

      <SpecsSection plotInfo={plotInfo} />

      <NotesSection plotInfo={plotInfo} />

      {Array.isArray(plotInfo?.zone) && (
        <List title='Zone:' className={style.zone}>
          {plotInfo?.zone?.map(item => (
            <li key={item} className={style.zoneItem}>
              {item}
            </li>
          ))}
        </List>
      )}

      <AddressesSection plotInfo={plotInfo} />

      <OwnersSection plotInfo={plotInfo} />

      <TransactionsSection plotInfo={plotInfo} />

      <BuildingPermitsSection plotInfo={plotInfo} />

      {plotInfo?.derniere_modification && (
        <p className={style.lastEdits}>
          Last edits:{' '}
          <b>{convertTimeFormat(plotInfo?.derniere_modification)}</b>
        </p>
      )}
    </div>
  )
}

export default memo(PlotsPanel)
