import { useEffect, useState } from 'react'
import IconButton from '../../../components/IconButton/IconButton'
import Tooltip from '../../../components/Tooltip/Tooltip'
import style from './HeadingSection.module.scss'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import { BiFileBlank as FileIcon } from 'react-icons/bi'
import { useQuery } from '../../../hooks/useQuery'
import { RiDraggable as DraggableIcon } from 'react-icons/ri'
import {
  BiBell as BellIcon,
  BiSolidBell as SolidBellIcon,
} from 'react-icons/bi'
import {
  FaRegBookmark as BookmarkIcon,
  FaBookmark as SolidBookmarkIcon,
} from 'react-icons/fa6'
import { plotService } from '../../../service/plotService'
import { useBookmarksStore, useTagsStore, useToastStore } from '../../../store'
import { PiTagBold as TagIcon } from 'react-icons/pi'

const HeadingSection = ({ plotInfo }) => {
  const plotId = plotInfo?.mongo_id
  const [isAddedToBookmarks, setIsAddedToBookmarks] = useState(false)
  const [isAddedToEmailAlerts, setIsAddedToEmailAlerts] = useState(false)
  const { setPlotsWithBookmarks } = useBookmarksStore()
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

  const { openTagsModal } = useTagsStore()
  const toast = useToastStore()

  const updateBookmarkedPlots = async () => {
    const plotsWithBookmarks =
      await plotService.getAllPlotsFeaturesWithBookmarks()
    setPlotsWithBookmarks(plotsWithBookmarks)
  }

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
        updateBookmarkedPlots()
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
        updateBookmarkedPlots()
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

  return (
    <div className={style.heading}>
      <h2 className={style.title}>Plot {plotInfo?.no_commune_no_parcelle}</h2>

      {isAddedToBookmarks ? (
        <Tooltip text='Remove plot from bookmarks alerts' bottom='-40px'>
          <IconButton disabled={loadingBookmark}>
            <SolidBookmarkIcon
              className={`${style.star}`}
              onClick={removeFromBookmarks}
            />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip text='Add plot to bookmarks alerts' bottom='-40px'>
          <IconButton disabled={loadingBookmark}>
            <BookmarkIcon
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

      <Tooltip text='Assign tag' bottom='-40px'>
        <IconButton disabled={loadingEmailAlerts}>
          <TagIcon onClick={openTagsModal} />
        </IconButton>
      </Tooltip>

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
    </div>
  )
}

export default HeadingSection
