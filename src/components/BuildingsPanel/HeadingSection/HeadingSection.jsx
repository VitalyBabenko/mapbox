import { useState } from 'react'
import style from './HeadingSection.module.scss'
import Tooltip from '../../Tooltip/Tooltip'

import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import { BiFileBlank as FileIcon } from 'react-icons/bi'

const HeadingSection = ({ plotId, buildingId, rdppf, closeBuildingPanel }) => {
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

      <CrossIcon onClick={closeBuildingPanel} className={style.crossIcon} />
    </div>
  )
}

export default HeadingSection
