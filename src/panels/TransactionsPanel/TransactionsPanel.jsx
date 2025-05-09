import { useEffect, useState } from 'react'
import style from './TransactionsPanel.module.scss'
import { useEventStore, useModeStore } from '../../store'
import { buildingService } from '../../service/buildingService'
import HeadingSection from '../BuildingsPanel/HeadingSection/HeadingSection'
import SpecsSection from '../BuildingsPanel/SpecsSection/SpecsSection'
import { List, Panel } from '../../components'
import TransactionsSection from '../BuildingsPanel/TransactionsSection/TransactionsSection'
import OwnersSection from '../BuildingsPanel/OwnersSection/OwnersSection'
import { convertTimeFormat } from '../../utils/convertTimeFormat'
import { plotService } from '../../service/plotService'
import { LuFileSearch as DocumentMissingIcon } from 'react-icons/lu'

const TransactionsPanel = () => {
  const [buildingInfo, setBuildingInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { locale } = useModeStore()
  const { setClickedFeature, clickedFeature } = useEventStore()
  const activeBuildingId = clickedFeature?.properties?.EGID

  const open = !!activeBuildingId
  const closePanel = () => setClickedFeature(null)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      setError('')
      const info = await buildingService.getByEgId(activeBuildingId)
      const transactions = await plotService.getTransactions(info?.ergid)

      if (info?.error || transactions?.error) {
        setError('Building information is unavailable. Please try again later.')
        setLoading(false)
        return
      }
      info.transactions = transactions || []
      setBuildingInfo(info)
      setLoading(false)
    }

    if (clickedFeature) getData()
  }, [clickedFeature])

  if (!buildingInfo) return null

  return (
    <Panel
      open={open}
      setOpen={closePanel}
      error={error}
      loading={loading}
      className={style.transactionsPanel}
      panelPosition={{ x: -50, y: 50 }}
      panelSide='right'
      heading={
        <HeadingSection
          plotId={buildingInfo?.plot?.no_commune_no_parcelle || null}
          buildingId={buildingInfo?.no_batiment || null}
          rdppf={buildingInfo?.plot?.extrait_rdppf_pdf || null}
        />
      }
    >
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

      {buildingInfo?.transactions?.length ? (
        <TransactionsSection transactions={buildingInfo?.transactions} />
      ) : (
        <section className={style.noTransactions}>
          <h3>Transactions:</h3>

          <DocumentMissingIcon size={24} />
          <p>Aucune transaction trouvée</p>
        </section>
      )}

      <OwnersSection owners={buildingInfo?.getOwners()} />

      {buildingInfo?.plot?.derniere_modification && (
        <p className={style.lastEdits}>
          Last edits:{' '}
          <b>{convertTimeFormat(buildingInfo?.plot?.derniere_modification)}</b>
        </p>
      )}
    </Panel>
  )
}

export default TransactionsPanel
