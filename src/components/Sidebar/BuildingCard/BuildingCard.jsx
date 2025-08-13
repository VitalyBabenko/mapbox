import style from './BuildingCard.module.scss'
import { HiOutlineClipboardDocumentList as DocsIcon } from 'react-icons/hi2'
import { FaRegCalendar as CalendarIcon } from 'react-icons/fa6'
import { FiHash as HashIcon } from 'react-icons/fi'
import { FiHome as HomeIcon } from 'react-icons/fi'
import { useEventStore } from '@store'
import { SkeletonBlock } from '@components'
import bbox from '@turf/bbox'

const BuildingCard = ({ item, map }) => {
  const { setHoveredFeature, setClickedFeature } = useEventStore()

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

export const BuildingCardSkeleton = () => {
  return (
    <li className={style.buildingCard}>
      <div className={style.heading}>
        <div>
          <SkeletonBlock
            width='190px'
            height='24px'
            variant='text'
            marginBottom='5px'
          />
          <SkeletonBlock
            width='80px'
            height='12px'
            variant='text'
            marginBottom='5px'
          />
        </div>

        <div className={style.price}>
          <SkeletonBlock
            width='130px'
            height='14px'
            variant='text'
            marginBottom='4px'
          />
          <SkeletonBlock width='150px' height='22px' variant='text' />
        </div>
      </div>

      <div className={style.divider} />

      <ul className={style.info}>
        <div className={style.infoRow}>
          {[1, 2, 3].map(item => (
            <li key={item} className={style.infoItem}>
              <SkeletonBlock
                width='100px'
                height='13px'
                variant='text'
                marginTop='4px'
              />
              <div className={style.infoItemValue}>
                <SkeletonBlock
                  width='60px'
                  height='14px'
                  variant='text'
                  marginTop='4px'
                  marginBottom='2px'
                />
              </div>
            </li>
          ))}
        </div>
      </ul>

      <div className={style.buttons}>
        <SkeletonBlock
          width='74px'
          height='30px'
          variant='button'
          className={style.analyzeButtonSkeleton}
        />
      </div>
    </li>
  )
}

export default BuildingCard
