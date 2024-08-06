import {
  BiStar as StarIcon,
  BiSolidStar as SolidStarIcon,
  BiBell as BellIcon,
  BiSolidBell as SolidBellIcon,
} from 'react-icons/bi'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import SpecsSection from './SpecsSection/SpecsSection'
import style from './PlotsPanel.module.scss'
import AddressesSection from './AddressesSection/AddressesSection'
import OwnersSection from './OwnersSection/OwnersSection'
import TransactionsSection from './TransactionsSection/TransactionsSection'
import NotesSection from './NotesSection/NotesSection'
import { convertTimeFormat } from '../../utils/convertTimeFormat'
import BuildingPermitsSection from './BuildingPermitsSection/BuildingPermitsSection'
import { BiFileBlank as FileIcon } from 'react-icons/bi'
import Tooltip from '../../components/Tooltip/Tooltip'
import List from '../../components/List/List'
import { plotService } from '../../service/plotService'
import { useQuery } from '../../hooks/useQuery'
import IconButton from '../../components/IconButton/IconButton'

const USER_ID = 2

const PlotsPanel = ({ activePlotId, setActivePlotId }) => {
  const [plotInfo, setPlotInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isAddedToBookmarks, setIsAddedToBookmarks] = useState(false)
  const [isAddedToEmailAlerts, setIsAddedToEmailAlerts] = useState(false)

  const { loading: loadingBookmark, handler: bookmarkHandler } = useQuery()
  const { loading: loadingEmailAlerts, handler: emailAlertsHandler } =
    useQuery()

  const closePlotPanel = () => setActivePlotId('')

  const addToEmailAlerts = async () => {
    emailAlertsHandler(() => plotService.addToEmailAlerts(plotInfo._id))
    setIsAddedToEmailAlerts(true)
  }

  const removeFromEmailAlerts = async () => {
    emailAlertsHandler(() => plotService.removeEmailAlerts(plotInfo._id))
    setIsAddedToEmailAlerts(false)
  }

  const addToBookmarkAlerts = async () => {
    await bookmarkHandler(() => plotService.addToBookmarksAlerts(plotInfo._id))
    setIsAddedToBookmarks(true)
  }

  const removeFromBookmarks = async () => {
    await bookmarkHandler(() => plotService.removeBookmarksAlerts(plotInfo._id))
    setIsAddedToBookmarks(false)
  }

  useEffect(() => {
    const getData = async () => {
      setError(null)
      setIsLoading(true)
      const info = await plotService.getPlotByEgrId(activePlotId)

      if (info?.error?.message?.length) {
        setError('Building information is unavailable. Please try again later.')
        setIsLoading(false)
        return
      }

      setPlotInfo(info)

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

    if (activePlotId) getData()
  }, [activePlotId])

  if (!activePlotId) return null

  if (error)
    return (
      <div className={style.panel}>
        <ErrorMessage
          message='Plot information is unavailable. Please try again later.'
          onClose={closePlotPanel}
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
            <IconButton disabled={loadingBookmark}>
              <SolidStarIcon
                className={`${style.star}`}
                onClick={removeFromBookmarks}
              />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip text='Add plot to bookmarks alerts' bottom='-40px'>
            <IconButton disabled={loadingBookmark}>
              <StarIcon
                className={`${style.star}`}
                onClick={addToBookmarkAlerts}
              />
            </IconButton>
          </Tooltip>
        )}

        {isAddedToEmailAlerts ? (
          <Tooltip text='Remove plot from email alerts' bottom='-40px'>
            <IconButton disabled={loadingEmailAlerts}>
              <SolidBellIcon onClick={removeFromEmailAlerts} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip text='Add plot to email alerts' bottom='-40px'>
            <IconButton disabled={loadingEmailAlerts}>
              <BellIcon onClick={addToEmailAlerts} />
            </IconButton>
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

export default PlotsPanel
