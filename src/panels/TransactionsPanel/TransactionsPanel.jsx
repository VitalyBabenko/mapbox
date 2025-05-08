import { useEffect, useState } from 'react'
import useDraggable from '../../hooks/useDraggable'
import style from './TransactionsPanel.module.scss'
import { useEventStore, useModeStore } from '../../store'
import { buildingService } from '../../service/buildingService'
import Loader from '../../components/Loader/Loader'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import HeadingSection from '../BuildingsPanel/HeadingSection/HeadingSection'
import SpecsSection from '../BuildingsPanel/SpecsSection/SpecsSection'
import { List } from '../../components'
import TransactionsSection from '../BuildingsPanel/TransactionsSection/TransactionsSection'
import OwnersSection from '../BuildingsPanel/OwnersSection/OwnersSection'
import { convertTimeFormat } from '../../utils/convertTimeFormat'

const TransactionsPanel = ({ activeBuildingId }) => {
  const { position, handleMouseDown } = useDraggable({ x: -50, y: 50 })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [buildingInfo, setBuildingInfo] = useState(null)
  const { locale } = useModeStore()
  const { setClickedFeature } = useEventStore()
  const closeBuildingPanel = () => setClickedFeature(null)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      setError('')

      const info = await buildingService.getByEgId(activeBuildingId)

      if (info?.error?.message?.length) {
        setError('Building information is unavailable. Please try again later.')
        setIsLoading(false)
        return
      }

      setBuildingInfo(info)
      setIsLoading(false)
    }

    if (activeBuildingId) getData()
  }, [activeBuildingId])

  if (!activeBuildingId) return null
  if (isLoading) {
    return (
      <div
        className={style.panelLoading}
        style={{ top: position.y, right: -position.x }}
      >
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div
        className={style.panel}
        style={{ top: position.y, right: -position.x }}
      >
        <ErrorMessage message={error} onClose={closeBuildingPanel} />
      </div>
    )
  }

  return (
    <div
      className={style.panel}
      style={{ top: position.y, right: -position.x }}
    >
      <HeadingSection
        plotId={buildingInfo?.plot?.no_commune_no_parcelle || null}
        buildingId={buildingInfo.no_batiment}
        egid={buildingInfo.egid}
        rdppf={buildingInfo?.plot?.extrait_rdppf_pdf}
        closeBuildingPanel={closeBuildingPanel}
        handleMouseDown={handleMouseDown}
      />

      {buildingInfo?.egid && (
        <p className={style.commune}>
          EGID: <span>{buildingInfo.egid}</span>
        </p>
      )}

      <SpecsSection
        locale={locale}
        constructionYear={buildingInfo.annee_de_construction_du_batiment}
        apartmentsQuantity={buildingInfo.building_apartments_qty}
        buildingArea={
          buildingInfo.surface_totale_des_logements_du_batiment_m2 || null
        }
        roomQuantity={
          buildingInfo.nombre_total_de_pieces_des_logements_du_batiment
        }
      />

      {Array.isArray(buildingInfo?.plot?.zone) && (
        <List title='Zone:' className={style.zone}>
          {buildingInfo.plot?.zone?.map(item => (
            <li key={item} className={style.zoneItem}>
              {item}
            </li>
          ))}
        </List>
      )}

      <TransactionsSection
        transactions={buildingInfo?.plot?.transactions_list}
      />

      <OwnersSection owners={buildingInfo?.getOwners()} />

      {buildingInfo?.plot?.derniere_modification && (
        <p className={style.lastEdits}>
          Last edits:{' '}
          <b>{convertTimeFormat(buildingInfo?.plot?.derniere_modification)}</b>
        </p>
      )}
    </div>
  )
}

export default TransactionsPanel
