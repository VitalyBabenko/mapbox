import style from './OpacitySection.module.scss'
import RangeSlider from 'react-range-slider-input'

import { useModeStore, usePaintStore } from '../../../store'
import { MODES } from '../../../constants'

const OpacitySection = ({ title }) => {
  const { opacity, setOpacity } = usePaintStore()
  const { mode } = useModeStore()

  const getTitle = () => {
    if (title) return title

    switch (mode) {
      case MODES.COUNTIES:
        return 'Communes visibility'

      case MODES.PLOTS:
        return 'Plots visibility'

      case MODES.BUILDINGS:
        return 'Buildings visibility'

      default:
        return 'Layer opacity'
    }
  }

  const resetButton = () => (
    <button className={style.reset} onClick={() => setOpacity([0, 40])}>
      Reset
    </button>
  )

  return (
    <div className={style.wrapper}>
      <h3>
        {getTitle()}
        {opacity[1] !== 40 ? resetButton() : ''}
      </h3>

      <div className={style.options}>
        <RangeSlider
          className={`${style.range} single-thumb`}
          defaultValue={opacity}
          value={opacity}
          onInput={value => setOpacity(value)}
          thumbsDisabled={[true, false]}
          min={1}
          max={100}
          step={1}
        />
        <span>{opacity[1]}%</span>
      </div>
    </div>
  )
}

export default OpacitySection
