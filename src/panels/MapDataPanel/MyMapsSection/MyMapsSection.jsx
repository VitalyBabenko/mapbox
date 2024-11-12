import { useMap } from 'react-map-gl'
import { INITIAL_VIEW, MODES } from '../../../constants'
import { useModeStore } from '../../../store'
import style from './MyMapsSection.module.scss'

const MyMapsSection = () => {
  const { current: map } = useMap()
  const {
    mode,
    switchToTagsMode,
    switchToCountiesMode,
    switchToBookmarksMode,
  } = useModeStore()

  const resetMap = () => {
    switchToCountiesMode()
    map.flyTo({
      center: [INITIAL_VIEW.LONGITUDE, INITIAL_VIEW.LATITUDE],
      zoom: INITIAL_VIEW.ZOOM,
      essential: true,
    })
  }

  const handlePlotsWithTagsClick = () => {
    if (mode === MODES.TAGS) {
      resetMap()
    } else {
      switchToTagsMode()
    }
  }

  const handlePlotsWithBookmarksClick = () => {
    if (mode === MODES.BOOKMARKS) {
      resetMap()
    } else {
      switchToBookmarksMode()
    }
  }

  const isResetButtonShowed = mode === MODES.TAGS || mode === MODES.BOOKMARKS

  return (
    <>
      <div className={style.heading}>
        <h3 className={style.title}>My Maps</h3>

        {isResetButtonShowed && <button onClick={resetMap}>Reset</button>}
      </div>

      <ul className={style.list}>
        <li
          onClick={() => handlePlotsWithTagsClick()}
          className={mode === MODES.TAGS ? style.active : null}
        >
          <img src='https://via.placeholder.com/150' alt='placeholder' />
          <span>Plots with tags</span>
        </li>

        <li
          onClick={() => handlePlotsWithBookmarksClick()}
          className={mode === MODES.BOOKMARKS ? style.active : null}
        >
          <img src='https://via.placeholder.com/150' alt='placeholder' />
          <span>Plots with bookmarks</span>
        </li>
      </ul>
    </>
  )
}

export default MyMapsSection
