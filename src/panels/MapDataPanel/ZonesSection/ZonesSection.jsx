import { useZoneStore } from '../../../store'
import style from './ZoneSection.module.scss'
import paintByStatusPreview from '../../../assets/images/paintByStatusPreview.png'
import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import Checkbox from '../../../components/Checkbox/Checkbox'

const ZonesSection = () => {
  const {
    isActive,
    toggleActive,
    zoneOpacity,
    setZoneOpacity,
    isTipsActive,
    toggleTipsActive,
    isScaleActive,
    toggleScaleActive,
  } = useZoneStore()

  return (
    <>
      <div className={style.heading}>
        <h3>Zone</h3>

        {isActive && <button onClick={() => toggleActive()}>Reset</button>}
      </div>

      <ul className={style.list}>
        <li
          onClick={() => toggleActive()}
          className={isActive ? style.active : ''}
        >
          <img src={paintByStatusPreview} alt='preview' />
          <span>Zones</span>
        </li>

        {isActive && (
          <div className={style.options}>
            <div className={style.checkboxes}>
              <Checkbox
                label='Tips'
                checked={isTipsActive}
                onChange={() => toggleTipsActive()}
              />
              <Checkbox
                label='Scale'
                checked={isScaleActive}
                onChange={() => toggleScaleActive()}
              />
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
