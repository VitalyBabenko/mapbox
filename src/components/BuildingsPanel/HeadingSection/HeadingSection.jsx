import { useState } from 'react'
import style from './HeadingSection.module.scss'
import Tooltip from '../../Tooltip/Tooltip'
import {
  BiStar as StarIcon,
  BiSolidStar as SolidStarIcon,
  BiBell as BellIcon,
  BiSolidBell as SolidBellIcon,
} from 'react-icons/bi'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'

const HeadingSection = ({ plotId, buildingId, closeBuildingPanel }) => {
  const getHeading = () => {
    return plotId ? `Plot ${plotId}` : `Building ${buildingId}`
  }

  return (
    <div className={style.heading}>
      <h2>{getHeading()}</h2>

      <CrossIcon onClick={closeBuildingPanel} className={style.crossIcon} />
    </div>
  )
}

export default HeadingSection
