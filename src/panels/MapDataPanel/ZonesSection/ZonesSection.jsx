import { useModeStore, useZoneStore } from '../../../store'
import style from './ZoneSection.module.scss'
import paintByZonesPreview from '../../../assets/images/paintByZonesPreview.png'
import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import bbox from '@turf/bbox'
import { useMap } from 'react-map-gl'

const ZonesSection = () => {
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
        <h3>Zone</h3>

        {isActive && <button onClick={() => resetZones()}>Reset</button>}
      </div>

      <ul className={style.list}>
        <li
          onClick={() => toggleActive()}
          className={isActive ? style.active : ''}
        >
          <img src={paintByZonesPreview} alt='preview' />
          <span>Zones</span>
        </li>

        {isActive && (
          <div className={style.options}>
            <div className={style.switcher}>
              <button
                onClick={() => togglePrimary(true)}
                className={isPrimary ? style.active : ''}
              >
                Primary
              </button>

              <button
                onClick={handleBackgroundClick}
                className={!isPrimary ? style.active : ''}
              >
                Background
              </button>

              <span className={isPrimary ? style.left : style.right}></span>
            </div>

            <p>Opacity: {zoneOpacity[1]}%</p>

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
