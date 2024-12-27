import { MODES } from '../../constants'
import { BookmarksMode, ProtectedMode, ZonesMode } from '../../modes'
import { PlotsPanel } from '../../panels'
import FeaturesPanel from '../../panels/FeaturesPanel/FeaturesPanel'
import SettingsPanel from '../../panels/SettingsPanel/SettingsPanel'
import { useEventStore, useNotesStore } from '../../store'
import {
  FaRegNoteSticky as NoteIcon,
  FaNoteSticky as NoteIconSolid,
} from 'react-icons/fa6'

const NotesPage = ({ isMapLoading, isZonesPrimary, isZonesActive, mode }) => {
  const { clickedFeature } = useEventStore()
  const { plotsWithNotes } = useNotesStore()

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
        features={plotsWithNotes.features}
        emptyTitle='Notes Empty'
      />
    </>
  )
}

export default NotesPage
