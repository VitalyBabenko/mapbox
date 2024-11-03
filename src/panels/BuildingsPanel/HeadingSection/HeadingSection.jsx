import style from './HeadingSection.module.scss'
import Tooltip from '../../../components/Tooltip/Tooltip'

import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import { BiFileBlank as FileIcon } from 'react-icons/bi'
import { RiDraggable as DraggableIcon } from 'react-icons/ri'

const HeadingSection = ({
  plotId,
  buildingId,
  rdppf,
  closeBuildingPanel,
  handleMouseDown,
}) => {
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

      <Tooltip text='Move the panel' bottom='-40px'>
        <DraggableIcon
          className={style.draggableIcon}
          onMouseDown={handleMouseDown}
        />
      </Tooltip>
      <CrossIcon onClick={closeBuildingPanel} className={style.crossIcon} />
    </div>
  )
}

export default HeadingSection
