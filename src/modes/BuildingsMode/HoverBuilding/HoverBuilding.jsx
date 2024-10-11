import { Layer, Popup } from 'react-map-gl'
import {
  BUILDINGS_SOURCE,
  PAINT_BY_APARTS_QTY,
  PAINT_BY_CONSTRUCTION_PERIOD,
  PAINT_BY_LAST_TRANSACTION,
  PAINT_BY_STATUS,
  PAINT_BY_TRANSACTION_AMOUNT,
  PAINT_BY_TYPE,
} from '../../../constants'
import { useMemo } from 'react'
import { useEventStore, usePaintStore } from '../../../store'

const HoverBuilding = ({ isActive, opacity }) => {
  const { hoverEvent, hoveredFeature } = useEventStore()
  const { activePaint } = usePaintStore()
  const hoverBuilding = hoveredFeature?.properties || null

  const filterForHoverBuilding = useMemo(
    () => (isActive ? ['in', 'EGID', hoverBuilding?.EGID || 0] : null),
    [isActive, hoveredFeature],
  )

  const hoverOpacity = (opacity + 20) / 100

  const getPopupText = () => {
    switch (activePaint) {
      case PAINT_BY_TYPE:
        return hoverBuilding?.TYPOLOGIE || 'Not found'

      case PAINT_BY_APARTS_QTY:
        return hoverBuilding?.APARTS_QTY
          ? `${hoverBuilding?.APARTS_QTY} unit(s)`
          : 'No units'

      case PAINT_BY_CONSTRUCTION_PERIOD:
        return hoverBuilding?.EP_CONSTR || 'Not found'

      case PAINT_BY_LAST_TRANSACTION:
        return hoverBuilding?.TRNSC_DATE
          ? `Last transaction: ${hoverBuilding?.TRNSC_DATE}`
          : 'No transaction'

      case PAINT_BY_TRANSACTION_AMOUNT:
        return hoverBuilding?.TRNSC_PRC > 0
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

  if (!isActive) return null
  return (
    <>
      <Layer
        id='hoverBuilding'
        type='fill'
        source={BUILDINGS_SOURCE.id}
        source-layer={BUILDINGS_SOURCE.sourceLayer}
        paint={{
          'fill-color': '#80b4f6',
          'fill-opacity': hoverOpacity > 1 ? 1 : hoverOpacity,
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
