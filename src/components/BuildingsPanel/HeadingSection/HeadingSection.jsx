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

const HeadingSection = ({ egid, closeBuildingPanel }) => {
  const [isAddedToBookmarks, setIsAddedToBookmarks] = useState(false)
  const [isAddedToEmailAlerts, setIsAddedToEmailAlerts] = useState(false)

  // TODO: Add email alerts
  const removeFromBookmarks = () => {}
  const addToBookmarkAlerts = () => {}

  const addToEmailAlerts = () => {}
  const removeFromEmailAlerts = () => {}

  return (
    <div className={style.heading}>
      <h2>Building {egid}</h2>

      {isAddedToBookmarks ? (
        <Tooltip text='Remove building from bookmarks alerts' bottom='-40px'>
          <SolidStarIcon
            className={`${style.star}`}
            onClick={removeFromBookmarks}
          />
        </Tooltip>
      ) : (
        <Tooltip text='Add building to bookmarks alerts' bottom='-40px'>
          <StarIcon className={`${style.star}`} onClick={addToBookmarkAlerts} />
        </Tooltip>
      )}

      {isAddedToEmailAlerts ? (
        <Tooltip text='Remove building from email alerts' bottom='-40px'>
          <SolidBellIcon onClick={removeFromEmailAlerts} />
        </Tooltip>
      ) : (
        <Tooltip text='Add building to email alerts' bottom='-40px'>
          <BellIcon onClick={addToEmailAlerts} />
        </Tooltip>
      )}

      <CrossIcon onClick={closeBuildingPanel} className={style.crossIcon} />
    </div>
  )
}

export default HeadingSection
