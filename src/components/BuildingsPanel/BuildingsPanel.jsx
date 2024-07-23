import style from './BuildingsPanel.module.scss'
import { useEffect, useState } from 'react'

import Loader from '../Loader/Loader'
import { buildingService } from '../../service/buildingService'
import HeadingSection from './HeadingSection/HeadingSection'
import SpecsSection from './SpecsSection/SpecsSection'
import AddressSection from './AddressSection/AddressSection'
import OwnersSection from './OwnersSection/OwnersSection'
import List from '../List/List'
// import AddressSection from './AddressSection/AddressSection'

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

      setBuildingInfo(info)
      setIsLoading(false)
      console.log(info)
    }

    if (building) getData()
  }, [building])

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
        egid={buildingInfo.egid}
        closeBuildingPanel={closeBuildingPanel}
      />

      {buildingInfo?.commune_name && (
        <p className={style.commune}>
          Commune: <span>{buildingInfo.commune_name}</span>
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

      <List title='Zone:' className={style.zone}>
        {buildingInfo.getZone()?.map(item => (
          <li key={item} className={style.zoneItem}>
            {item}
          </li>
        ))}
      </List>

      <AddressSection
        commune={buildingInfo.commune_name}
        address={buildingInfo.address_name}
        buildingClass={buildingInfo.classe_de_batiment}
        buildingCategory={buildingInfo.categorie_de_batiment}
        buildingStatus={buildingInfo.statut_du_batiment}
        postCode={buildingInfo.no_postal}
        floorsQuantity={buildingInfo.nombre_de_niveaux}
      />

      <OwnersSection owners={buildingInfo?.getOwners()} />
    </div>
  )
}

export default BuildingsPanel
