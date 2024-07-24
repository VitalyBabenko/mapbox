import { Layer, Source } from 'react-map-gl'

const PlotsByFilter = ({ filterSearchPlots }) => {
  if (!filterSearchPlots.length) return null

  return (
    <Source id='plotsByFilters' type='vector' url='mapbox://lamapch.64ix47h1'>
      <Layer
        id='plots'
        type='fill'
        source-layer='CAD_PARCELLE_MENSU_WGS84-dor0ac'
        filter={['in', 'EGRID', ...filterSearchPlots]}
        paint={{
          'fill-color': '#ed0e2c',
          'fill-opacity': 0.6,
        }}
        beforeId='poi-label'
      />
    </Source>
  )
}

export default PlotsByFilter
