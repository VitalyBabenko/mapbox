import { PlotsPanel } from '../../panels'
import SettingsPanel from '../../panels/SettingsPanel/SettingsPanel'
import { useEventStore } from '../../store'
import FeaturesPanel from '../../panels/FeaturesPanel/FeaturesPanel'
import { PiTagBold as TagIcon } from 'react-icons/pi'
import { PiTagFill as TagIconFill } from 'react-icons/pi'
import { useEffect, useState } from 'react'
import { plotService } from '../../service/plotService'
import GeojsonRenderer from '../../components/GeojsonRenderer/GeojsonRenderer'

const TagsPage = () => {
  const [plotsWithTags, setPlotsWithTags] = useState([])
  const { clickedFeature } = useEventStore()

  useEffect(() => {
    const getPlotsWithTags = async () => {
      const resp = await plotService.getAllPlotsFeaturesWithTags()
      setPlotsWithTags(resp)
    }
    getPlotsWithTags()
  }, [])

  return (
    <>
      <SettingsPanel />

      <GeojsonRenderer
        sourceId='tagsSource'
        layerId='tagsLayer'
        geojson={plotsWithTags}
        isActive={true}
      />

      <PlotsPanel activePlotId={clickedFeature?.properties?.EGRID} />

      <FeaturesPanel
        icon={<TagIconFill />}
        title='Tags'
        buttonIcon={<TagIcon />}
        buttonText='Tags'
        features={plotsWithTags.features}
        emptyTitle='Tags Empty'
      />
    </>
  )
}

export default TagsPage
