import { Layer, Source } from 'react-map-gl'

const PlotsLayer = ({ county, hoverPlot, plot, filterSearch }) => {
  const sourceLayer = 'CAD_PARCELLE_MENSU_WGS84-dor0ac'
  const countyName = county?.properties?.gdname
  const hoverPlotId = hoverPlot?.properties?.EGRID
  const activePlotId = plot?.properties?.EGRID

  const filterForHoverPlot = ['in', 'EGRID', hoverPlotId]
  const filterForActivePlot = ['in', 'EGRID', activePlotId]

  let communeFilter = ['match', ['get', 'COMMUNE'], countyName, true, false]

  if (countyName?.[0] === '[') {
    communeFilter = [
      'match',
      ['get', 'COMMUNE'],
      JSON.parse(countyName),
      true,
      false,
    ]
  }

  const plotsFilter = [
    'all',
    ['match', ['get', 'TYPE_PROPR'], ['privé'], true, false],
    communeFilter,
  ]

  if (!county) return null
  return (
    <Source id='plotsSource' type='vector' url='mapbox://lamapch.64ix47h1'>
      <Layer
        id='plots'
        type='fill'
        source-layer={sourceLayer}
        filter={plotsFilter}
        paint={{
          'fill-color': '#006cd5',
          'fill-opacity': 0.4,
          'fill-outline-color': 'white',
        }}
        beforeId='poi-label'
      />

      {hoverPlot && (
        <Layer
          id='plotsHover'
          type='fill'
          source-layer={sourceLayer}
          filter={filterForHoverPlot}
          paint={{
            'fill-color': '#006cd5',

            'fill-opacity': 0.6,
          }}
          beforeId='poi-label'
        />
      )}

      {plot && (
        <Layer
          id='plotsActive'
          type='fill'
          source-layer={sourceLayer}
          filter={filterForActivePlot}
          paint={{
            'fill-color': '#ed0e2c',
            'fill-opacity': 0.6,
          }}
          beforeId='poi-label'
        />
      )}

      {filterSearch.length > 0 && (
        <Layer
          id='plotsByFilter'
          type='fill'
          source-layer={sourceLayer}
          filter={['in', 'EGRID', ...filterSearch]}
          paint={{
            'fill-color': '#ed0e2c',
            'fill-opacity': 0.6,
            'fill-outline-color': 'white',
          }}
          beforeId='poi-label'
        />
      )}
    </Source>
  )
}

export default PlotsLayer
