import { ProtectedMode, TagsMode, ZonesMode } from '../../modes'
import { PlotsPanel } from '../../panels'
import SettingsPanel from '../../panels/SettingsPanel/SettingsPanel'
import { useEventStore, useTagsStore } from '../../store'
import { MODES } from '../../constants'
import FeaturesPanel from '../../panels/FeaturesPanel/FeaturesPanel'
import { PiTagBold as TagIcon } from 'react-icons/pi'
import { PiTagFill as TagIconFill } from 'react-icons/pi'

const TagsPage = ({ isMapLoading, isZonesPrimary, isZonesActive, mode }) => {
  const { clickedFeature } = useEventStore()
  const { plotsWithTags } = useTagsStore()

  const getIsModeActive = currentMode => {
    if (isMapLoading) return false
    if (isZonesPrimary && isZonesActive) return false
    return mode === currentMode
  }

  console.log(plotsWithTags)

  return (
    <>
      <SettingsPanel />
      <TagsMode isActive={true} />
      <ZonesMode />
      <PlotsPanel activePlotId={clickedFeature?.properties?.EGRID} />
      <ProtectedMode isActive={getIsModeActive(MODES.PROTECTED)} />
      <FeaturesPanel
        icon={<TagIconFill />}
        title='Tags'
        buttonIcon={<TagIcon />}
        buttonText='Tags'
        features={plotsWithTags.features}
      />
    </>
  )
}

export default TagsPage
