import { useEffect, useState } from 'react'
import { FeaturesPanel, SettingsPanel } from '../../panels'
import { useEventStore } from '../../store'
import {
  FaRegNoteSticky as NoteIcon,
  FaNoteSticky as NoteIconSolid,
} from 'react-icons/fa6'
import { plotService } from '../../service/plotService'
import GeojsonRenderer from '../../components/GeojsonRenderer/GeojsonRenderer'

const NotesPage = () => {
  const [plotsWithNotes, setPlotsWithNotes] = useState([])
  const { clickedFeature } = useEventStore()

  useEffect(() => {
    const getPlotsWithNotes = async () => {
      const resp = await plotService.getAllPlotsFeaturesWithNotes()
      setPlotsWithNotes(resp)
    }
    getPlotsWithNotes()
  }, [])

  return (
    <>
      <SettingsPanel />

      <GeojsonRenderer
        sourceId='notesSource'
        layerId='notesLayer'
        geojson={plotsWithNotes}
        isActive={true}
      />

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
