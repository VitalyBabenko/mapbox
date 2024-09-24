import { useEffect, useState } from 'react'
import IconButton from '../../../components/IconButton/IconButton'
import Tooltip from '../../../components/Tooltip/Tooltip'
import style from './HeadingSection.module.scss'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import { BiFileBlank as FileIcon } from 'react-icons/bi'
import { useQuery } from '../../../hooks/useQuery'
import {
  BiStar as StarIcon,
  BiSolidStar as SolidStarIcon,
  BiBell as BellIcon,
  BiSolidBell as SolidBellIcon,
} from 'react-icons/bi'
import { plotService } from '../../../service/plotService'
import { useToastStore } from '../../../store'

const HeadingSection = ({ plotInfo, closePlotPanel }) => {
  const plotId = plotInfo?.mongo_id
  const [isAddedToBookmarks, setIsAddedToBookmarks] = useState(false)
  const [isAddedToEmailAlerts, setIsAddedToEmailAlerts] = useState(false)
  const {
    error: errorBookmark,
    loading: loadingBookmark,
    handler: bookmarkHandler,
  } = useQuery()
  const {
    error: errorEmailAlerts,
    loading: loadingEmailAlerts,
    handler: emailAlertsHandler,
  } = useQuery()
  const toast = useToastStore()

  const addToEmailAlerts = () => {
    emailAlertsHandler(async () => {
      const data = await plotService.addToEmailAlerts(plotId)
      if (data.result) {
        setIsAddedToEmailAlerts(true)
        toast.success(data.message)
      } else {
        toast.error('Failed to add to email alerts')
      }
    })
  }

  const removeFromEmailAlerts = () => {
    emailAlertsHandler(async () => {
      const data = await plotService.removeEmailAlerts(plotId)
      if (data.result) {
        setIsAddedToEmailAlerts(false)
        toast.success('Removed from email alerts')
      } else {
        toast.error('Failed to remove from email alerts')
      }
    })
  }

  const addToBookmarkAlerts = async () => {
    bookmarkHandler(async () => {
      const data = await plotService.addToBookmarksAlerts(plotId)
      if (data.result) {
        setIsAddedToBookmarks(true)
        toast.success(data.message)
      } else {
        toast.error('Failed to add to bookmarks')
      }
    })
  }

  const removeFromBookmarks = async () => {
    bookmarkHandler(async () => {
      const data = await plotService.removeBookmarksAlerts(plotId)
      if (data.result) {
        setIsAddedToBookmarks(false)
        toast.success('Removed from bookmarks')
      } else {
        toast.error('Failed to remove from bookmarks')
      }
    })
  }

  useEffect(() => {
    const getData = async () => {
      if (!plotInfo) return

      emailAlertsHandler(async () => {
        const alerts = await plotService.getEmailAlerts(plotId)
        setIsAddedToEmailAlerts(!!alerts.length)
      })

      bookmarkHandler(async () => {
        const bookmarks = await plotService.getBookmarksAlerts(plotId)
        setIsAddedToBookmarks(!!bookmarks.length)
      })
    }

    getData()
  }, [plotInfo])

  useEffect(() => {
    if (!!errorBookmark || !!errorEmailAlerts) {
      toast.error('Error while receiving an email alert and bookmark')
    }
  }, [errorBookmark, errorEmailAlerts])

  if (!plotInfo)
    return (
      <div className={style.heading}>
        <CrossIcon onClick={closePlotPanel} className={style.crossIcon} />
      </div>
    )

  return (
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
  )
}

export default HeadingSection
