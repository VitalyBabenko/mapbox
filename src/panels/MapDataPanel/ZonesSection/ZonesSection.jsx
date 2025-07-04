import { useModeStore, useZoneStore } from '../../../store'
import style from './ZoneSection.module.scss'
import paintByZonesPreview from '../../../assets/images/paintByZonesPreview.png'
import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import bbox from '@turf/bbox'
import { useMap } from 'react-map-gl'
import { useLocale } from '../../../hooks/useLocale'

const ZonesSection = () => {
  const { t } = useLocale('panels.mapData')
  const { current: map } = useMap()
  const { county } = useModeStore()
  const {
    isActive,
    toggleActive,
    resetZones,
    zoneOpacity,
    setZoneOpacity,
    isPrimary,
    togglePrimary,
  } = useZoneStore()

  const handleBackgroundClick = () => {
    if (county) {
      const [minLng, minLat, maxLng, maxLat] = bbox(county)
      map.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 0, duration: 1500, zoom: 13 },
      )
    }

    togglePrimary(false)
  }

  return (
    <>
      <div className={style.heading}>
        <h3>{t('zone')}</h3>

        {isActive && (
          <button onClick={() => resetZones()}>{t('buttons.reset')}</button>
        )}
      </div>

      <ul className={style.list}>
        <li
          onClick={() => toggleActive()}
          className={isActive ? style.active : ''}
        >
          <img src={paintByZonesPreview} alt='preview' />
        </li>

        {isActive && (
          <div className={style.options}>
            <div className={style.switcher}>
              <button
                onClick={() => togglePrimary(true)}
                className={isPrimary ? style.active : ''}
              >
                {t('primary')}
              </button>

              <button
                onClick={handleBackgroundClick}
                className={!isPrimary ? style.active : ''}
              >
                {t('background')}
              </button>

              <span className={isPrimary ? style.left : style.right}></span>
            </div>

            <p>
              {t('zoneVisibility')}: {zoneOpacity[1]}%
            </p>

            <RangeSlider
              className={`${style.range} single-thumb`}
              onInput={value => setZoneOpacity(value)}
              defaultValue={zoneOpacity}
              thumbsDisabled={[true, false]}
              rangeSlideDisabled={true}
            />
          </div>
        )}
      </ul>
    </>
  )
}

export default ZonesSection
