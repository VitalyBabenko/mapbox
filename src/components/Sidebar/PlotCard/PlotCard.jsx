import style from './PlotCard.module.scss'
import { RiRuler2Line as RulerIcon } from 'react-icons/ri'
import { HiOutlineClipboardDocumentList as DocsIcon } from 'react-icons/hi2'
import { MdOutlineContentCopy as CopyIcon } from 'react-icons/md'
import { FaRegCalendar as CalendarIcon } from 'react-icons/fa6'
import { FiHash as HashIcon } from 'react-icons/fi'
import { Tooltip } from '../../../components'
import { useEventStore, useToastStore } from '../../../store'
import bbox from '@turf/bbox'

const formatRecordDate = dateStr => {
  if (!dateStr || dateStr.length !== 14) return ''
  const [year, month, day] = [
    dateStr.slice(0, 4),
    dateStr.slice(4, 6),
    dateStr.slice(6, 8),
  ]
  return `${day}.${month}.${year}`
}

const PlotCard = ({ item, map }) => {
  const { setHoveredFeature, setClickedFeature } = useEventStore()
  const toast = useToastStore()

  const {
    IDEDDP,
    NO_PARCELL,
    COMMUNE,
    SURFACE,
    TYPE_PROPR,
    EGRID,
    ADDRESS,
    DATEDT,
    EXTRAIT_RD,
  } = item?.properties || {}

  const plotData = {
    id: IDEDDP?.replace(':', '/') || null,
    parcelNo: NO_PARCELL || null,
    county: COMMUNE || null,
    surface: SURFACE || null,
    typology: TYPE_PROPR || null,
    egrid: EGRID || null,
    address: ADDRESS || null,
    date: DATEDT || null,
    link: EXTRAIT_RD || null,
  }

  const infoItems = [
    {
      label: 'Surface',
      icon: <RulerIcon size={14} />,
      value: plotData.surface && (
        <>
          {plotData.surface} <span>m²</span>
        </>
      ),
    },
    {
      label: 'Ownership type',
      icon: <DocsIcon size={14} />,
      value: plotData.typology,
    },
    {
      label: 'Last update',
      icon: <CalendarIcon className={style.calendarIcon} size={13} />,
      value: formatRecordDate(plotData.date),
    },
    {
      label: 'Parcel No.',
      icon: <HashIcon size={13} />,
      value: plotData.parcelNo,
    },
  ]

  const copyEgrid = e => {
    e.stopPropagation()
    if (!plotData.egrid) return
    navigator.clipboard.writeText(plotData.egrid)
    toast.success('EGRID copied to clipboard')
  }

  const handleAnalyze = () => {
    setClickedFeature(item)

    if (map && item.geometry) {
      const bounds = bbox(item)
      map.fitBounds(bounds, { padding: 350, duration: 1000 })
    }
  }

  return (
    <li
      className={style.plotCard}
      onMouseEnter={() => setHoveredFeature(item)}
      onMouseLeave={() => setHoveredFeature(null)}
    >
      <div className={style.heading}>
        <div>
          <p className={style.id}>Plot: {plotData.id}</p>
          <span className={style.county}>{plotData.county}</span>
        </div>

        <div className={style.egrid}>
          <span className={style.egridLabel}>EGRID</span>
          <div className={style.egridValue}>
            <Tooltip text='Copy to clipboard' top='-35px'>
              <CopyIcon
                className={style.copyIcon}
                onClick={copyEgrid}
                size={16}
              />
            </Tooltip>
            <p className={style.infoItemValueText}>{plotData.egrid}</p>
          </div>
        </div>
      </div>

      <div className={style.divider} />

      <ul className={style.info}>
        {infoItems
          .filter(item => item.value)
          .map(({ label, icon, value }) => (
            <li key={label} className={style.infoItem}>
              <span className={style.infoItemTitle}>{label}</span>
              <div className={style.infoItemValue}>
                {icon}
                <p className={style.infoItemValueText}>{value}</p>
              </div>
            </li>
          ))}
      </ul>

      <div className={style.buttons}>
        <a
          href={plotData.link}
          onClick={e => e.stopPropagation()}
          target='_blank'
          rel='noopener noreferrer'
        >
          <button className={style.cadastralExtractButton}>
            Cadastral extract
          </button>
        </a>
        <button className={style.analyzeButton} onClick={handleAnalyze}>
          Analyze
        </button>
      </div>
    </li>
  )
}

export default PlotCard
