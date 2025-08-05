import style from './HeadingSection.module.scss'
import Tooltip from '../../../components/Tooltip/Tooltip'
import { BiFileBlank as FileIcon } from 'react-icons/bi'
import { useLocale } from '../../../hooks'

const HeadingSection = ({ plotId, buildingId, rdppf }) => {
  const { t } = useLocale('panels.buildings')

  const getHeading = () => {
    return plotId ? `${t('plot')} ${plotId}` : `${t('building')} ${buildingId}`
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
    </div>
  )
}

export default HeadingSection
