import style from './HeadingSection.module.scss'
import Tooltip from '@components/Tooltip/Tooltip'
import { BiFileBlank as FileIcon } from 'react-icons/bi'
import { useLocale, useDrawer } from '@hooks'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import { useEventStore } from '@store'

const HeadingSection = ({ buildingId, rdppf, isLoading }) => {
  const { t } = useLocale('panels.buildings')
  const { closeDrawer } = useDrawer()
  const { setClickedFeature } = useEventStore()

  const getHeading = () => {
    if (isLoading) return t('loading') || 'Loading...'
    return `${t('building')} ${buildingId}`
  }

  const handleClose = () => {
    closeDrawer()
    setClickedFeature(true)
  }

  return (
    <div className={style.heading}>
      <h2>{getHeading()}</h2>

      {rdppf && (
        <a
          className={style.fileLink}
          href={rdppf}
          target='_blank'
          rel='noreferrer'
        >
          <Tooltip text='RDPPF' bottom='-40px'>
            <FileIcon />
          </Tooltip>
        </a>
      )}

      <CrossIcon onClick={handleClose} size={24} className={style.crossIcon} />
    </div>
  )
}

export default HeadingSection
