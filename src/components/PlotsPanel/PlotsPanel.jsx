import {
  BiStar as StarIcon,
  BiSolidStar as SolidStarIcon,
  BiBell as BellIcon,
  BiSolidBell as SolidBellIcon,
} from 'react-icons/bi'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import { memo, useEffect, useState } from 'react'
import { service } from '../../service'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import SpecsSection from './SpecsSection/SpecsSection'
import style from './PlotsPanel.module.scss'
import AddressesSection from './AddressesSection/AddressesSection'
import OwnersSection from './OwnersSection/OwnersSection'
import TransactionsSection from './TransactionsSection/TransactionsSection'
import NotesSection from './NotesSection/NotesSection'
import { convertTimeFormat } from '../../utils/convertTimeFormat'
import BuildingPermitsSection from './BuildingPermitsSection/BuildingPermitsSection'
import { BiFileBlank as FileIcon } from 'react-icons/bi'
import Tooltip from '../Tooltip/Tooltip'
import List from '../List/List'
import { plotService } from '../../service/plotService'

const USER_ID = 2

const PlotsPanel = ({ plot, setPlot }) => {
  const [plotInfo, setPlotInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isAddedToBookmarks, setIsAddedToBookmarks] = useState(false)
  const [isAddedToEmailAlerts, setIsAddedToEmailAlerts] = useState(false)

  const closePlotPanel = () => setPlot(null)

  const addToEmailAlerts = async () => {
    await plotService.addToEmailAlerts(plotInfo._id)
    setIsAddedToEmailAlerts(true)
  }

  const removeFromEmailAlerts = async () => {
    await plotService.removeEmailAlerts(plotInfo._id)
    setIsAddedToEmailAlerts(false)
  }

  const addToBookmarkAlerts = async () => {
    await plotService.addToBookmarksAlerts(plotInfo._id)
    setIsAddedToBookmarks(true)
  }

  const removeFromBookmarks = async () => {
    await plotService.removeBookmarksAlerts(plotInfo._id)
    setIsAddedToBookmarks(false)
  }

  useEffect(() => {
    const getData = async () => {
      setError(null)
      setIsLoading(true)
      const info = await service.getPlotByEgrId(plot?.properties?.EGRID)
      info?.error?.message ? setError(info.error.message) : setPlotInfo(info)

      const { bookmarks } = await plotService.getBookmarksAlerts(info._id)

      setIsAddedToBookmarks(
        !!bookmarks.find(({ user_id }) => user_id === USER_ID),
      )

      const { alerts } = await plotService.getEmailAlerts(info._id)

      setIsAddedToEmailAlerts(
        !!alerts.find(({ user_id }) => user_id === USER_ID),
      )

      setIsLoading(false)
    }

    if (plot) getData()
  }, [plot])

  if (!plot) return null

  if (error)
    return (
      <div className={style.panel}>
        <ErrorMessage
          message='Plot information is unavailable. Please try again later.'
          onClose={() => setPlot(null)}
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

      <div className={style.heading}>
        <h2>Plot {plotInfo?.no_commune_no_parcelle}</h2>

        {isAddedToBookmarks ? (
          <Tooltip text='Remove plot from bookmarks alerts' bottom='-40px'>
            <SolidStarIcon
              className={`${style.star}`}
              onClick={removeFromBookmarks}
            />
          </Tooltip>
        ) : (
          <Tooltip text='Add plot to bookmarks alerts' bottom='-40px'>
            <StarIcon
              className={`${style.star}`}
              onClick={addToBookmarkAlerts}
            />
          </Tooltip>
        )}

        {isAddedToEmailAlerts ? (
          <Tooltip text='Remove plot from email alerts' bottom='-40px'>
            <SolidBellIcon onClick={removeFromEmailAlerts} />
          </Tooltip>
        ) : (
          <Tooltip text='Add plot to email alerts' bottom='-40px'>
            <BellIcon onClick={addToEmailAlerts} />
          </Tooltip>
        )}

        {plotInfo?.extrait_rdppf_pdf && (
          <a
            className={style.fileLink}
            href={plotInfo.extrait_rdppf_pdf}
            target='_blank'
            rel='noreferrer'
          >
            <Tooltip text='RDPPF' bottom='-40px'>
              <FileIcon />
            </Tooltip>
          </a>
        )}

        <CrossIcon onClick={closePlotPanel} className={style.crossIcon} />
      </div>

      {plotInfo?.commune_name && (
        <p className={style.commune}>
          Commune: <span>{plotInfo.commune_name}</span>
        </p>
      )}

      <SpecsSection plotInfo={plotInfo} />

      <NotesSection plotInfo={plotInfo} />

      <List title='Zone:' className={style.zone}>
        {plotInfo?.zone?.map(item => (
          <li key={item} className={style.zoneItem}>
            {item}
          </li>
        ))}
      </List>

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
