import { Layer, Source } from 'react-map-gl'
import { useEventStore, usePaintStore, useTagsStore } from '../../store'

const MarkedMode = () => {
  const {
    plotsWithTags,
    isPlotsWithTagsShowed,
    plotsWithBookmarks,
    isPlotsWithBookmarksShowed,
  } = useTagsStore()
  const { opacity } = usePaintStore()
  const { hoveredFeature, clickedFeature } = useEventStore()

  const getFillOpacity = () => {
    const hoverOpacity = (opacity[1] + 40) / 100
    if (hoveredFeature?.properties?.EGID) {
      return [
        'case',
        ['==', ['get', 'EGID'], hoveredFeature?.properties?.EGID],
        hoverOpacity > 1 ? 1 : hoverOpacity,
        opacity[1] / 100,
      ]
    }
    return opacity[1] / 100
  }

  const getFillColor = () => {
    if (clickedFeature?.properties?.EGRID) {
      return [
        'case',
        ['==', ['get', 'EGRID'], clickedFeature?.properties?.EGRID],
        '#ed0e2c',
        '#58dca6',
      ]
    }
    return '#58dca6'
  }

  const tagsGeojson = {
    type: 'FeatureCollection',
    features: plotsWithTags,
  }

  const bookmarksGeojson = {
    type: 'FeatureCollection',
    features: plotsWithBookmarks,
  }

  return (
    <>
      <Source id='marked' type='geojson' data={tagsGeojson}>
        <Layer
          id='markedBookmarks'
          type='fill'
          paint={{
            'fill-outline-color': '#006cd5',
            'fill-color': getFillColor(),
            'fill-opacity': getFillOpacity(),
          }}
          layout={{
            visibility: isPlotsWithBookmarksShowed ? 'visible' : 'none',
          }}
          beforeId='poi-label'
        />
      </Source>

      <Source id='marked' type='geojson' data={bookmarksGeojson}>
        <Layer
          id='markedTags'
          type='fill'
          paint={{
            'fill-outline-color': '#006cd5',
            'fill-color': getFillColor(),
            'fill-opacity': getFillOpacity(),
          }}
          layout={{
            visibility: isPlotsWithTagsShowed ? 'visible' : 'none',
          }}
          beforeId='poi-label'
        />
      </Source>
    </>
  )
}

export default MarkedMode
