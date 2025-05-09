import style from './HeadingSection.module.scss'
import Tooltip from '../../../components/Tooltip/Tooltip'
import { BiFileBlank as FileIcon } from 'react-icons/bi'

const HeadingSection = ({ plotId, buildingId, rdppf }) => {
  const getHeading = () => {
    return plotId ? `Plot ${plotId}` : `Building ${buildingId}`
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
