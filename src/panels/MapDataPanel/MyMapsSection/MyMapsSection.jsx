import { useMap } from 'react-map-gl'
import { INITIAL_VIEW, MODES } from '../../../constants'
import { useModeStore } from '../../../store'
import style from './MyMapsSection.module.scss'
import bookmarksModePreview from '../../../assets/images/bookmarksModePreview.png'
import tagsModePreview from '../../../assets/images/tagsModePreview.png'
import alertsModePreview from '../../../assets/images/alertsModePreview.png'
import notesModePreview from '../../../assets/images/notesModePreview.png'
import { Link } from 'react-router-dom'

const MyMapsSection = () => {
  const { current: map } = useMap()
  const { mode, switchToCountiesMode } = useModeStore()
  const pathname = window.location.pathname

  const resetMap = () => {
    switchToCountiesMode()
    map.flyTo({
      center: [INITIAL_VIEW.LONGITUDE, INITIAL_VIEW.LATITUDE],
      zoom: INITIAL_VIEW.ZOOM,
      essential: true,
    })
  }

  const links = [
    {
      href: '/explore/map/tags',
      title: 'Plots with tags',
      image: tagsModePreview,
    },
    {
      href: '/explore/map/bookmarks',
      title: 'Plots with bookmarks',
      image: bookmarksModePreview,
    },
    {
      href: '/explore/map/alerts',
      title: 'Plots with alerts',
      image: alertsModePreview,
    },
    {
      href: '/explore/map/notes',
      title: 'Plots with notes',
      image: notesModePreview,
    },
  ]

  const isResetShowed =
    pathname.includes('notes') ||
    pathname.includes('alerts') ||
    pathname.includes('bookmarks') ||
    pathname.includes('tags')

  return (
    <>
      <div className={style.heading}>
        <h3 className={style.title}>My Maps</h3>

        {isResetShowed && (
          <Link className={style.reset} to='/explore/map/plots'>
            Reset
          </Link>
        )}
      </div>

      <ul className={style.list}>
        {links.map(link => (
          <li
            key={link.href}
            className={pathname === link.href ? style.active : null}
          >
            <Link to={link.href}>
              <img src={link.image} alt='placeholder' />
              <span>{link.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default MyMapsSection
