import { MODES } from '../../constants'
import { BookmarksMode, ProtectedMode, ZonesMode } from '../../modes'
import { PlotsPanel } from '../../panels'
import FeaturesPanel from '../../panels/FeaturesPanel/FeaturesPanel'
import SettingsPanel from '../../panels/SettingsPanel/SettingsPanel'
import { useBookmarksStore, useEventStore } from '../../store'
import { FaRegBookmark as BookmarkIcon } from 'react-icons/fa6'
import { FaBookmark as BookmarkIconSolid } from 'react-icons/fa6'

const BookmarksPage = ({
  isMapLoading,
  isZonesPrimary,
  isZonesActive,
  mode,
}) => {
  const { clickedFeature } = useEventStore()
  const { plotsWithBookmarks } = useBookmarksStore()

  console.log(plotsWithBookmarks)

  const getIsModeActive = currentMode => {
    if (isMapLoading) return false
    if (isZonesPrimary && isZonesActive) return false
    return mode === currentMode
  }

  return (
    <>
      <SettingsPanel />
      <BookmarksMode isActive={true} />
      <ZonesMode />
      <PlotsPanel activePlotId={clickedFeature?.properties?.EGRID} />
      <ProtectedMode isActive={getIsModeActive(MODES.PROTECTED)} />
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
