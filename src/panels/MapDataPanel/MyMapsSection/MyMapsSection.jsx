import style from './MyMapsSection.module.scss'
import bookmarksModePreview from '../../../assets/images/bookmarksModePreview.png'
import tagsModePreview from '../../../assets/images/tagsModePreview.png'
import alertsModePreview from '../../../assets/images/alertsModePreview.png'
import notesModePreview from '../../../assets/images/notesModePreview.png'
import { useLocale } from '../../../hooks/useLocale'

const MyMapsSection = () => {
  const { t } = useLocale('panels.mapData')
  const pathname = window.location.pathname

  const links = [
    {
      href: '/explore/map/tags',
      title: t('plotsWithTags'),
      image: tagsModePreview,
    },
    {
      href: '/explore/map/bookmarks',
      title: t('plotsWithBookmarks'),
      image: bookmarksModePreview,
    },
    {
      href: '/explore/map/alerts',
      title: t('plotsWithAlerts'),
      image: alertsModePreview,
    },
    {
      href: '/explore/map/notes',
      title: t('plotsWithNotes'),
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
        <h3 className={style.title}>{t('myMaps')}</h3>

        {isResetShowed && (
          <a className={style.reset} href='/explore/map/plots'>
            {t('buttons.reset')}
          </a>
        )}
      </div>

      <ul className={style.list}>
        {links.map(link => (
          <li
            key={link.href}
            className={pathname === link.href ? style.active : null}
          >
            <a href={link.href}>
              <img src={link.image} alt='placeholder' />
              <span>{link.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default MyMapsSection
