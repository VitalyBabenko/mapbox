import { useMap } from 'react-map-gl'
import { INITIAL_VIEW } from '../../../constants'
import { useModeStore, useTagsStore } from '../../../store'
import style from './MyMapsSection.module.scss'

const MyMapsSection = () => {
  const { current: map } = useMap()
  const {
    isPlotsWithTagsShowed,
    setIsPlotsWithTagsShowed,
    isPlotsWithBookmarksShowed,
    setIsPlotsWithBookmarksShowed,
  } = useTagsStore()
  const { switchToMarkedMode, switchToCountiesMode } = useModeStore()

  const handlePlotsWithTagsClick = () => {
    if (isPlotsWithTagsShowed) {
      if (!isPlotsWithBookmarksShowed) {
        switchToCountiesMode()
      }
      setIsPlotsWithTagsShowed(false)
    } else {
      switchToMarkedMode()
      setIsPlotsWithTagsShowed(true)
    }
  }

  const handlePlotsWithBookmarksClick = () => {
    if (isPlotsWithBookmarksShowed) {
      if (!isPlotsWithTagsShowed) {
        switchToCountiesMode()
      }
      setIsPlotsWithBookmarksShowed(false)
    } else {
      switchToMarkedMode()
      setIsPlotsWithBookmarksShowed(true)
    }
  }

  const handleResetClick = () => {
    setIsPlotsWithTagsShowed(false)
    setIsPlotsWithBookmarksShowed(false)
    switchToCountiesMode()
    map.flyTo({
      center: [INITIAL_VIEW.LONGITUDE, INITIAL_VIEW.LATITUDE],
      zoom: INITIAL_VIEW.ZOOM,
      essential: true,
    })
  }

  const isResetButtonShowed =
    isPlotsWithTagsShowed || isPlotsWithBookmarksShowed

  return (
    <>
      <div className={style.heading}>
        <h3 className={style.title}>My Maps</h3>

        {isResetButtonShowed && (
          <button onClick={handleResetClick}>Reset</button>
        )}
      </div>

      <ul className={style.list}>
        <li
          onClick={() => handlePlotsWithTagsClick()}
          className={isPlotsWithTagsShowed ? style.active : null}
        >
          <img src='https://via.placeholder.com/150' alt='placeholder' />
          <span>Plots with tags</span>
        </li>

        <li
          onClick={() => handlePlotsWithBookmarksClick()}
          className={isPlotsWithBookmarksShowed ? style.active : null}
        >
          <img src='https://via.placeholder.com/150' alt='placeholder' />
          <span>Plots with bookmarks</span>
        </li>
      </ul>
    </>
  )
}

export default MyMapsSection
