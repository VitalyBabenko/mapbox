import { Layer, Popup } from 'react-map-gl'
import {
  BUILDINGS_SOURCE,
  DEFAULT_PAINT,
  PAINT_BY_APARTS_QTY,
  PAINT_BY_CONSTRUCTION_PERIOD,
  PAINT_BY_LAST_TRANSACTION,
  PAINT_BY_STATUS,
  PAINT_BY_TRANSACTION_AMOUNT,
  PAINT_BY_TYPE,
} from '../../../constants'
import { useEffect, useMemo, useState } from 'react'
import { useEventStore, usePaintStore } from '../../../store'

const HoverBuilding = ({ isActive, map }) => {
  const { hoverEvent } = useEventStore()
  const { activePaint } = usePaintStore()
  const [hoverBuilding, setHoverBuilding] = useState(null)

  useEffect(() => {
    if (hoverEvent === null) return

    const feature = map.queryRenderedFeatures(hoverEvent.point, {
      layers: ['buildings'],
    })[0]

    if (!feature) {
      setHoverBuilding(null)
      return
    }

    setHoverBuilding(feature?.properties)
  }, [hoverEvent])

  const filterForHoverBuilding = useMemo(
    () => ['in', 'EGID', hoverBuilding?.EGID],
    [isActive, hoverBuilding],
  )

  const getPopupText = () => {
    switch (activePaint) {
      case PAINT_BY_TYPE:
        return hoverBuilding?.TYPOLOGIE || 'Not found'

      case PAINT_BY_APARTS_QTY:
        return hoverBuilding?.APARTS_QTY
          ? `${hoverBuilding?.APARTS_QTY} unit(s)`
          : 'No units'

      case PAINT_BY_CONSTRUCTION_PERIOD:
        return hoverBuilding?.EP_CONSTR || 'No date'

      case PAINT_BY_LAST_TRANSACTION:
        return hoverBuilding?.TRNSC_DATE || 'No transaction'

      case PAINT_BY_TRANSACTION_AMOUNT:
        return hoverBuilding?.TRNSC_PRC
          ? `CHF ${hoverBuilding?.TRNSC_PRC.toString().replace(
              /\B(?=(\d{3})+(?!\d))/g,
              "'",
            )}`
          : 'No transaction'

      case PAINT_BY_STATUS:
        const firstLetter = hoverBuilding?.STATUT_DA.slice(0, 1)
        const result =
          firstLetter.toUpperCase() +
          hoverBuilding?.STATUT_DA.slice(1).toLowerCase()

        return result || 'No found'

      default:
        return hoverBuilding?.ADDR_NAME
    }
  }

  return (
    <>
      <Layer
        id='hoverBuilding'
        type='fill'
        source={BUILDINGS_SOURCE.id}
        source-layer={BUILDINGS_SOURCE.sourceLayer}
        paint={{
          'fill-color': '#006cd5',
          'fill-opacity': 0.6,
        }}
        filter={filterForHoverBuilding}
        beforeId='poi-label'
        layout={{ visibility: isActive && hoverBuilding ? 'visible' : 'none' }}
      />
      {hoverBuilding && isActive && (
        <Popup
          longitude={hoverEvent.lngLat.lng}
          latitude={hoverEvent.lngLat.lat}
          offset={[0, -5]}
          closeButton={false}
          className='hover-popup'
        >
          {getPopupText()}
        </Popup>
      )}
    </>
  )
}

export default HoverBuilding
