import style from './BuildingsPanel.module.scss'
import { memo, useEffect, useState } from 'react'

import Loader from '../../components/Loader/Loader'
import { buildingService } from '../../service/buildingService'
import HeadingSection from './HeadingSection/HeadingSection'
import SpecsSection from './SpecsSection/SpecsSection'
import AddressSection from './AddressSection/AddressSection'
import OwnersSection from './OwnersSection/OwnersSection'
import List from '../../components/List/List'
import DetailsSection from './DetailsSection/DetailsSection'
import TransactionsSection from './TransactionsSection/TransactionsSection'
import PermitsSection from './PermitsSection/PermitsSection'
import { convertTimeFormat } from '../../utils/convertTimeFormat'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import { useEventStore } from '../../store'
import useDraggable from '../../hooks/useDraggable'

const BuildingsPanel = ({ activeBuildingId, setActiveBuildingId }) => {
  const { position, handleMouseDown } = useDraggable({ x: -50, y: 50 })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [buildingInfo, setBuildingInfo] = useState(null)
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

  const getConstructionDate = () => {
    if (!buildingInfo) return null
    const variant1 = buildingInfo?.annee_de_construction
    const variant2 = buildingInfo?.annee_de_construction_du_batiment

    if (variant1?.length) return variant1
    if (variant2?.length) return variant2
    return null
  }

  if (!activeBuildingId) return null
  if (isLoading) {
    return (
      <div className={style.panelLoading}>
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className={style.panel}>
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
        constructionYear={buildingInfo.annee_de_construction_du_batiment}
        apartmentsQuantity={buildingInfo.building_apartments_qty}
        buildingArea={
          buildingInfo.surface_totale_des_logements_du_batiment_m2 || null
        }
        postCode={buildingInfo.no_postal}
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

      <AddressSection
        address={buildingInfo.address_name}
        commune={buildingInfo.commune_name}
        postCode={buildingInfo.no_postal}
        buildingNumber={buildingInfo.no_batiment}
        isPPE={buildingInfo?.plot?.ppe}
        buildingTypology={buildingInfo?.getExtendedInfo()?.typologie_d_immeuble}
        buildingCategory={buildingInfo?.getExtendedInfo()?.categorie_d_immeuble}
        buildingType={buildingInfo?.categorie_de_batiment}
        buildingClass={buildingInfo?.classe_de_batiment}
        registerOfBuildingsLink={
          buildingInfo?.getExtendedInfo()?.lien_registre_batiments
        }
        isConstructionCerts={buildingInfo?.plot?.construction_certs?.length}
        buildingInfo={buildingInfo}
      />

      <DetailsSection
        buildingArea={buildingInfo?.plot?.surface_immeuble_sum}
        plotArea={buildingInfo?.plot?.surface_parcelle_m2}
        livingArea={
          buildingInfo?.getExtendedInfo()?.surface_brut_de_plancher_hors_sol_m2
        }
        buildingAreaOnTheGround={
          buildingInfo?.getExtendedInfo()?.surface_immeuble_au_sol_m2
        }
        totalGroundArea={
          buildingInfo?.getExtendedInfo()?.surface_totale_au_sol_m2
        }
        buildingVolume={buildingInfo?.volume_du_batiment}
        levelsAboveGround={buildingInfo?.getExtendedInfo()?.niveaux_hors_sol}
        levelsUnderGround={buildingInfo?.getExtendedInfo()?.niveaux_sous_sol}
        totalLevels={buildingInfo?.nombre_de_niveaux}
        buildingHeight={buildingInfo?.plot?.hauteur_immeuble_m}
        constructionPeriod={
          buildingInfo?.getExtendedInfo()?.epoque_de_construction
        }
        constructionDate={getConstructionDate()}
        renovationDate={buildingInfo.annee_de_construction_du_batiment}
        demolitionDate={buildingInfo.annee_de_demolition_du_batiment}
      />

      <OwnersSection owners={buildingInfo?.getOwners()} />

      <TransactionsSection
        transactions={buildingInfo?.plot?.transactions_list}
      />

      <PermitsSection permits={buildingInfo?.plot?.construction_certs} />

      {buildingInfo?.plot?.derniere_modification && (
        <p className={style.lastEdits}>
          Last edits:{' '}
          <b>{convertTimeFormat(buildingInfo?.plot?.derniere_modification)}</b>
        </p>
      )}
    </div>
  )
}

export default memo(BuildingsPanel)
