import { useEffect, useState } from 'react'
import { BookmarksMode } from '../../modes'
import { PlotsPanel, FeaturesPanel, SettingsPanel } from '../../panels'
import { useEventStore } from '../../store'
import { FaRegBookmark as BookmarkIcon } from 'react-icons/fa6'
import { FaBookmark as BookmarkIconSolid } from 'react-icons/fa6'
import { plotService } from '../../service/plotService'
import GeojsonRenderer from '../../components/GeojsonRenderer/GeojsonRenderer'

const BookmarksPage = () => {
  const [plotsWithBookmarks, setPlotsWithBookmarks] = useState([])
  const { clickedFeature } = useEventStore()

  useEffect(() => {
    const getPlotsWithBookmarks = async () => {
      const resp = await plotService.getAllPlotsFeaturesWithBookmarks()
      setPlotsWithBookmarks(resp)
    }
    getPlotsWithBookmarks()
  }, [])

  return (
    <>
      <SettingsPanel />

      <GeojsonRenderer
        sourceId='bookmarksSource'
        layerId='bookmarksLayer'
        geojson={plotsWithBookmarks}
        isActive={true}
      />

      <BookmarksMode isActive={true} />

      <PlotsPanel activePlotId={clickedFeature?.properties?.EGRID} />

      <FeaturesPanel
        icon={<BookmarkIconSolid />}
        title='Bookmarks'
        buttonIcon={<BookmarkIcon size={16} />}
        buttonText='Bookmarks'
        features={plotsWithBookmarks.features}
        emptyTitle='Bookmarks Empty'
      />
    </>
  )
}

export default BookmarksPage
