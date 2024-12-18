import { MODES } from '../../constants'
import { BookmarksMode, ProtectedMode, ZonesMode } from '../../modes'
import { PlotsPanel } from '../../panels'
import FeaturesPanel from '../../panels/FeaturesPanel/FeaturesPanel'
import SettingsPanel from '../../panels/SettingsPanel/SettingsPanel'
import { useBookmarksStore, useEventStore } from '../../store'
// import { FaRegBookmark as BookmarkIcon } from 'react-icons/fa6'
// import { FaBookmark as BookmarkIconSolid } from 'react-icons/fa6'
import {
  FaRegNoteSticky as NoteIcon,
  FaNoteSticky as NoteIconSolid,
} from 'react-icons/fa6'

const NotesPage = ({ isMapLoading, isZonesPrimary, isZonesActive, mode }) => {
  const { clickedFeature } = useEventStore()
  const { plotsWithBookmarks } = useBookmarksStore()

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
        icon={<NoteIconSolid />}
        title='Notes'
        buttonIcon={<NoteIcon size={16} />}
        buttonText='Notes'
        features={plotsWithBookmarks.features}
        emptyTitle='Notes Empty'
      />
    </>
  )
}

export default NotesPage
