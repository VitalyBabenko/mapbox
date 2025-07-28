import { useMap } from 'react-map-gl'
import style from './ResetViewButton.module.scss'
import { DEFAULT_PAINT, INITIAL_VIEW } from '../../constants'
import { GrPowerReset as ResetIcon } from 'react-icons/gr'
import {
  useEventStore,
  useFilterStore,
  useModeStore,
  usePaintStore,
} from '../../store'
import { useLocale } from '../../hooks/useLocale'

const ResetViewButton = ({
  top,
  left,
  right,
  bottom,
  isVisible,
  resetViewButtonRef,
}) => {
  const { current: map } = useMap()
  const { switchToCountiesMode } = useModeStore()
  const { setFiltersResult } = useFilterStore()
  const { setActivePaint } = usePaintStore()
  const { setClickedFeature } = useEventStore()
  const { locale } = useLocale()

  const resetView = () => {
    map.flyTo({
      center: [INITIAL_VIEW.LONGITUDE, INITIAL_VIEW.LATITUDE],
      zoom: INITIAL_VIEW.ZOOM,
      essential: true,
    })

    setActivePaint(DEFAULT_PAINT)
    setFiltersResult([])
    switchToCountiesMode()
    setClickedFeature(null)
  }

  const inlineStyles = {
    top,
    left,
    right,
    bottom,
  }

  if (!isVisible) return null

  return (
    <button
      onClick={resetView}
      style={inlineStyles}
      className={`${style.resetButton} ${style[locale]}`}
      ref={resetViewButtonRef}
    >
      <ResetIcon />
      Reset view
    </button>
  )
}

export default ResetViewButton
