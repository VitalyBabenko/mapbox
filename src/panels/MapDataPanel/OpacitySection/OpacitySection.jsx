import style from './OpacitySection.module.scss'
import RangeSlider from 'react-range-slider-input'

import { useModeStore, usePaintStore } from '../../../store'
import { MODES } from '../../../constants'
import { useLocale } from '../../../hooks/useLocale'

const OpacitySection = ({ title }) => {
  const { t } = useLocale('panels.mapData')
  const { opacity, setOpacity } = usePaintStore()
  const { mode } = useModeStore()

  const getTitle = () => {
    if (title) return title

    switch (mode) {
      case MODES.COUNTIES:
        return t('countiesVisibility')

      case MODES.PLOTS:
        return t('plotsVisibility')

      case MODES.BUILDINGS:
        return t('buildingsVisibility')

      default:
        return t('layerOpacity')
    }
  }

  const resetButton = () => (
    <button className={style.reset} onClick={() => setOpacity([0, 40])}>
      {t('buttons.reset')}
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
