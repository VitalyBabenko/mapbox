import style from './BuildingCard.module.scss'
import { RiRuler2Line as RulerIcon } from 'react-icons/ri'
import { HiOutlineClipboardDocumentList as DocsIcon } from 'react-icons/hi2'
import { MdOutlineContentCopy as CopyIcon } from 'react-icons/md'
import { FaRegCalendar as CalendarIcon } from 'react-icons/fa6'
import { FiHash as HashIcon } from 'react-icons/fi'
import { FiHome as HomeIcon } from 'react-icons/fi'
import { Tooltip } from '../../../components'
import { useEventStore, useToastStore } from '../../../store'
import bbox from '@turf/bbox'
import { useDrawer } from '../../../hooks'

const BuildingCard = ({ item, map }) => {
  const { setHoveredFeature, setClickedFeature } = useEventStore()
  const toast = useToastStore()
  const { openDrawer } = useDrawer()

  const {
    ADDR_NAME,
    COMMUNE,
    APARTS_QTY,
    NOMEN_CLAS,
    EP_CONSTR,
    TYPOLOGIE,
    TRNSC_PRC,
    TRNSC_DATE,
  } = item?.properties || {}

  const buildingData = {
    address: ADDR_NAME?.replace(':', '/') || null,
    county: COMMUNE || null,
    apartments: APARTS_QTY || null,
    class: NOMEN_CLAS || null,
    constructionYear: EP_CONSTR || null,
    typology: TYPOLOGIE || null,
    lastTransactionPrice: TRNSC_PRC || null,
    lastTransactionDate: TRNSC_DATE || null,
  }

  const infoItems = [
    {
      label: 'Apartments',
      icon: <HomeIcon size={14} />,
      value: buildingData.apartments,
    },
    {
      label: 'Class',
      icon: <HashIcon size={13} />,
      value: buildingData.class,
    },
    {
      label: 'Construction year',
      icon: <CalendarIcon className={style.calendarIcon} size={13} />,
      value: buildingData.constructionYear,
    },
    {
      label: 'Typology',
      icon: <DocsIcon size={14} />,
      value: buildingData.typology,
    },
    {
      label: 'Transaction date',
      icon: <CalendarIcon className={style.calendarIcon} size={13} />,
      value: buildingData.lastTransactionDate,
    },
  ]

  const handleAnalyze = () => {
    setClickedFeature(item)

    if (map && item.geometry) {
      const bounds = bbox(item)
      map.fitBounds(bounds, { padding: 350, duration: 1000 })
    }
  }

  return (
    <li
      className={style.buildingCard}
      onMouseEnter={() => setHoveredFeature(item)}
      onMouseLeave={() => setHoveredFeature(null)}
    >
      <div className={style.heading}>
        <div>
          <p className={style.address}>{buildingData.address}</p>
          <span className={style.county}>{buildingData.county}</span>
        </div>

        {buildingData.lastTransactionPrice && (
          <div className={style.price}>
            <span className={style.priceLabel}>Last transaction price</span>
            <p className={style.priceValue}>
              {buildingData.lastTransactionPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, "'")}{' '}
              CHF
            </p>
          </div>
        )}
      </div>

      <div className={style.divider} />

      <ul className={style.info}>
        <div className={style.infoRow}>
          {infoItems
            .filter(item => item.value)
            .slice(0, 3)
            .map(({ label, icon, value }) => (
              <li key={label} className={style.infoItem}>
                <span className={style.infoItemTitle}>{label}</span>
                <div className={style.infoItemValue}>
                  {icon}
                  <p className={style.infoItemValueText}>{value}</p>
                </div>
              </li>
            ))}
        </div>
      </ul>

      <div className={style.buttons}>
        <button className={style.analyzeButton} onClick={handleAnalyze}>
          Analyze
        </button>
      </div>
    </li>
  )
}

export default BuildingCard
