import { useEffect, useState } from 'react'
import { MODES } from '../../constants'
import { ProtectedMode, ZonesMode } from '../../modes'
import { PlotsPanel } from '../../panels'
import FeaturesPanel from '../../panels/FeaturesPanel/FeaturesPanel'
import SettingsPanel from '../../panels/SettingsPanel/SettingsPanel'
import { useEventStore } from '../../store'
import {
  FaRegNoteSticky as NoteIcon,
  FaNoteSticky as NoteIconSolid,
} from 'react-icons/fa6'
import { plotService } from '../../service/plotService'
import GeojsonRenderer from '../../components/GeojsonRenderer/GeojsonRenderer'

const NotesPage = ({ isMapLoading, isZonesPrimary, isZonesActive, mode }) => {
  const [plotsWithNotes, setPlotsWithNotes] = useState([])
  const { clickedFeature } = useEventStore()

  useEffect(() => {
    const getPlotsWithNotes = async () => {
      const resp = await plotService.getAllPlotsFeaturesWithNotes()
      setPlotsWithNotes(resp)
    }
    getPlotsWithNotes()
  }, [])

  const getIsModeActive = currentMode => {
    if (isMapLoading) return false
    if (isZonesPrimary && isZonesActive) return false
    return mode === currentMode
  }

  return (
    <>
      <SettingsPanel />

      <GeojsonRenderer
        sourceId='notesSource'
        layerId='notesLayer'
        geojson={plotsWithNotes}
        isActive={true}
      />

      <PlotsPanel activePlotId={clickedFeature?.properties?.EGRID} />

      <FeaturesPanel
        icon={<NoteIconSolid />}
        title='Notes'
        buttonIcon={<NoteIcon size={16} />}
        buttonText='Notes'
        features={plotsWithNotes?.features}
        emptyTitle='Notes Empty'
      />
    </>
  )
}

export default NotesPage
