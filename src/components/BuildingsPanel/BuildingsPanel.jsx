import style from './BuildingsPanel.module.scss'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import { useEffect, useState } from 'react'

import Loader from '../Loader/Loader'
import { buildingService } from '../../service/buildingService'

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
      <div className={style.heading}>
        <h2>Plot {buildingInfo?.address_name}</h2>
        <CrossIcon onClick={closeBuildingPanel} className={style.crossIcon} />
      </div>
    </div>
  )
}

export default BuildingsPanel
