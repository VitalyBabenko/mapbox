import style from './PlotCard.module.scss'
import { RiRuler2Line as RulerIcon } from 'react-icons/ri'
import { HiOutlineClipboardDocumentList as DocsIcon } from 'react-icons/hi2'
import { MdOutlineContentCopy as CopyIcon } from 'react-icons/md'
import { FaRegCalendar as CalendarIcon } from 'react-icons/fa6'
import { FiHash as HashIcon } from 'react-icons/fi'
import { Tooltip, SkeletonBlock } from '@components'
import { useEventStore, useToastStore } from '@store'
import { useLocale } from '@hooks'
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
  const { t } = useLocale('plotCard')

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
      label: t('surface'),
      icon: <RulerIcon size={14} />,
      value: plotData.surface && (
        <>
          {plotData.surface} <span>{t('squareMeters')}</span>
        </>
      ),
    },
    {
      label: t('ownershipType'),
      icon: <DocsIcon size={14} />,
      value: plotData.typology,
    },
    {
      label: t('lastUpdate'),
      icon: <CalendarIcon className={style.calendarIcon} size={13} />,
      value: formatRecordDate(plotData.date),
    },
    {
      label: t('parcelNo'),
      icon: <HashIcon size={13} />,
      value: plotData.parcelNo,
    },
  ]

  const copyEgrid = e => {
    e.stopPropagation()
    if (!plotData.egrid) return
    navigator.clipboard.writeText(plotData.egrid)
    toast.success(t('egridCopied'))
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
          <p className={style.id}>
            {t('plot')}: {plotData.id}
          </p>
          <span className={style.county}>{plotData.county}</span>
        </div>

        <div className={style.egrid}>
          <span className={style.egridLabel}>{t('egrid')}</span>
          <div className={style.egridValue}>
            <Tooltip text={t('copyToClipboard')} top='-35px'>
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
            {t('cadastralExtract')}
          </button>
        </a>
        <button className={style.analyzeButton} onClick={handleAnalyze}>
          {t('analyze')}
        </button>
      </div>
    </li>
  )
}

export const PlotCardSkeleton = () => {
  return (
    <li className={style.plotCard}>
      <div className={style.heading}>
        <div>
          <SkeletonBlock
            width='100px'
            height='18px'
            variant='text'
            marginBottom='4px'
          />
          <SkeletonBlock
            width='80px'
            height='13px'
            variant='text'
            className={style.countySkeleton}
          />
        </div>

        <div className={style.egrid}>
          <SkeletonBlock
            width='40px'
            height='10px'
            variant='text'
            marginBottom='4px'
          />
          <div className={style.egridValue}>
            <SkeletonBlock
              width='150px'
              height='16px'
              variant='text'
              marginBottom='4px'
            />
          </div>
        </div>
      </div>

      <div className={style.divider} />

      <ul className={style.info}>
        {Array.from({ length: 3 }).map(item => (
          <li key={item} className={style.infoItem}>
            <SkeletonBlock
              width='100px'
              height='12px'
              variant='text'
              marginTop='6px'
              marginBottom='6px'
            />
            <div className={style.infoItemValue}>
              <SkeletonBlock
                width='60px'
                height='12px'
                variant='text'
                className={style.infoItemValueTextSkeleton}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className={style.buttons}>
        <SkeletonBlock
          width='123px'
          height='30px'
          variant='button'
          className={style.cadastralExtractButtonSkeleton}
        />
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

export default PlotCard
