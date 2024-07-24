import { Layer, Popup, Source, useMap } from 'react-map-gl'
import { useEffect, useMemo } from 'react'
import style from './CountiesLayer.module.scss'
import bbox from '@turf/bbox'

const CountiesLayer = ({ county, hoverCounty, hoverEvent, filterSearch }) => {
  const { current: map } = useMap()
  const hoverCountyId = hoverCounty?.properties?.genid

  const filterForHoverCounty = useMemo(
    () => ['in', 'genid', hoverCountyId],
    [hoverCountyId],
  )

  useEffect(() => {
    if (!county) return
    const [minLng, minLat, maxLng, maxLat] = bbox(county)
    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 0, duration: 1500, zoom: 13 },
    )
  }, [county])

  const getCountyName = county => {
    if (county?.properties?.gdname?.[0] === '[') {
      const arr = JSON.parse(county?.properties?.gdname)
      return arr?.join(', ')
    }
    return county?.properties?.gdname
  }

  const isShown = !(county || filterSearch.length)

  return (
    <Source id='countySource' type='vector' url='mapbox://lamapch.9a3g6tja'>
      <Layer
        id='counties'
        type='fill'
        source-layer='kanton_28-filt_reworked-a2cfbe'
        paint={{
          'fill-outline-color': 'rgba(256,256,256,1)',
          'fill-color': '#006cd5',
          'fill-opacity': 0.4,
        }}
        beforeId='poi-label'
        layout={{ visibility: isShown ? 'visible' : 'none' }}
      />

      {hoverCounty && (
        <Layer
          id='countiesHover'
          type='fill'
          source-layer='kanton_28-filt_reworked-a2cfbe'
          paint={{
            'fill-color': '#006cd5',
            'fill-opacity': 0.6,
          }}
          filter={filterForHoverCounty}
          layout={{ visibility: isShown ? 'visible' : 'none' }}
          beforeId='poi-label'
        />
      )}

      {hoverCounty && isShown && (
        <Popup
          longitude={hoverEvent.lngLat.lng}
          latitude={hoverEvent.lngLat.lat}
          offset={[0, -5]}
          closeButton={false}
          className={style.popup}
        >
          {getCountyName(hoverCounty)}
        </Popup>
      )}
    </Source>
  )
}

export default CountiesLayer
