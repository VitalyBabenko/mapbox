import style from './MyMapsSection.module.scss'
import { useLocale } from '../../../hooks/useLocale'
import {
  FaTags as TagsIcon,
  FaBookmark as BookmarksIcon,
  FaBell as AlertsIcon,
  FaStickyNote as NotesIcon,
} from 'react-icons/fa'

const MyMapsSection = () => {
  const { t } = useLocale('panels.mapData')
  const { t: tMyMaps } = useLocale('myMaps')
  const pathname = window.location.pathname

  const links = [
    {
      href: '/explore/map/tags',
      title: tMyMaps('tags'),
      icon: TagsIcon,
    },
    {
      href: '/explore/map/bookmarks',
      title: tMyMaps('bookmarks'),
      icon: BookmarksIcon,
    },
    {
      href: '/explore/map/alerts',
      title: tMyMaps('alerts'),
      icon: AlertsIcon,
    },
    {
      href: '/explore/map/notes',
      title: tMyMaps('notes'),
      icon: NotesIcon,
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
        <h3 className={style.title}>{t('myMaps')}</h3>

        {isResetShowed && (
          <a className={style.reset} href='/explore/map/plots'>
            {t('buttons.reset')}
          </a>
        )}
      </div>

      <ul className={style.list}>
        {links.map(link => {
          const IconComponent = link.icon
          return (
            <li
              key={link.href}
              className={pathname === link.href ? style.active : null}
            >
              <a href={link.href}>
                <div className={style.icon}>
                  <IconComponent />
                </div>
                <span>{link.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default MyMapsSection
