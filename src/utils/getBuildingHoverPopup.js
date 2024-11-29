import {
  PAINT_BY_APARTS_QTY,
  PAINT_BY_CONSTRUCTION_PERIOD,
  PAINT_BY_ENERGY,
  PAINT_BY_LAST_TRANSACTION,
  PAINT_BY_STATUS,
  PAINT_BY_TRANSACTION_AMOUNT,
  PAINT_BY_TYPE,
} from '../constants'

const getBuildingHoverPopupText = (activePaint, hoverBuilding) => {
  if (hoverBuilding?.DATEDT) {
    return 'Pool'
  }

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

    case PAINT_BY_ENERGY:
      return hoverBuilding?.ENRG || 'Not found'

    default:
      return hoverBuilding?.ADDR_NAME
  }
}

export default getBuildingHoverPopupText
