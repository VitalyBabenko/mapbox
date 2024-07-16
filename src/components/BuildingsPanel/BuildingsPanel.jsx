import style from './BuildingsPanel.module.scss'
import { useEffect, useState } from 'react'

import Loader from '../Loader/Loader'
import { buildingService } from '../../service/buildingService'
import HeadingSection from './HeadingSection/HeadingSection'
import SpecsSection from './SpecsSection/SpecsSection'

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
        buildingNumber={buildingInfo.no_batiment}
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
      />

      <p className={style.address}>{buildingInfo.address_name}</p>
    </div>
  )
}

export default BuildingsPanel
