import style from './BuildingsPanel.module.scss'
import { useEffect, useState } from 'react'

import Loader from '../Loader/Loader'
import { buildingService } from '../../service/buildingService'
import HeadingSection from './HeadingSection/HeadingSection'
import SpecsSection from './SpecsSection/SpecsSection'
import AddressSection from './AddressSection/AddressSection'
import OwnersSection from './OwnersSection/OwnersSection'
import List from '../List/List'
import DetailsSection from './DetailsSection/DetailsSection'
import TransactionsSection from './TransactionsSection/TransactionsSection'
import PermitsSection from './PermitsSection/PermitsSection'

const BuildingsPanel = ({ building, setBuilding }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [buildingInfo, setBuildingInfo] = useState(null)
  const closeBuildingPanel = () => setBuilding(null)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)

      const info = await buildingService.getByEgId(
        building?.properties?.EGRID_CENT,
      )

      console.log(info)

      setBuildingInfo(info)
      setIsLoading(false)
    }

    if (building) getData()
  }, [building])

  const getConstructionDate = () => {
    if (!buildingInfo) return null
    const variant1 = buildingInfo?.annee_de_construction
    const variant2 = buildingInfo?.annee_de_construction_du_batiment

    if (variant1?.length) return variant1
    if (variant2?.length) return variant2
    return null
  }

  if (!building) return null
  if (isLoading) {
    return (
      <div className={style.panelLoading}>
        <Loader />
      </div>
    )
  }

  return (
    <div className={style.panel}>
      <HeadingSection
        plotId={buildingInfo?.plot?.no_commune_no_parcelle || null}
        buildingId={buildingInfo.no_batiment}
        egid={buildingInfo.egid}
        closeBuildingPanel={closeBuildingPanel}
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
      {buildingInfo?.getZone() && (
        <List title='Zone:' className={style.zone}>
          {buildingInfo.getZone()?.map(item => (
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
        isPPE={buildingInfo.isPPE()}
        buildingTypology={buildingInfo.getExtendedInfo()?.typologie_d_immeuble}
        buildingCategory={buildingInfo.getExtendedInfo()?.categorie_d_immeuble}
        buildingType={buildingInfo?.categorie_de_batiment}
        buildingClass={buildingInfo?.classe_de_batiment}
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
    </div>
  )
}

export default BuildingsPanel
