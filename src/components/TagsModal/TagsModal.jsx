import { Typeahead } from 'react-bootstrap-typeahead'
import { useEventStore, useTagsStore, useToastStore } from '../../store'
import style from './TagsModal.module.scss'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import { PiTagBold as TagIcon } from 'react-icons/pi'
import { useEffect, useRef, useState } from 'react'
import { plotService } from '../../service/plotService'
import Loader from '../../components/Loader/Loader'
import { DEFAULT_TAG_COLORS } from '../../constants'
import Tooltip from '../../components/Tooltip/Tooltip'
import ColorPickerPopup from '../ColorPickerPopup/ColorPickerPopup'

const TagsModal = () => {
  const typeaheadRef = useRef(null)
  const [color, setColor] = useState(DEFAULT_TAG_COLORS[0])
  const [isLoading, setIsLoading] = useState(true)
  const { isTagModalOpen, closeTagsModal } = useTagsStore()
  const { clickedPlotInfo } = useEventStore()
  const toast = useToastStore()
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState([])
  const overlayClassName = isTagModalOpen
    ? style.overlay
    : `${style.overlay} ${style.hidden}`

  const handleClose = () => {
    setInputValue('')
    closeTagsModal()
    typeaheadRef.current?.clear()
  }

  const assignTagToPlot = async () => {
    try {
      const resp = await plotService.assignTagToPlot(
        clickedPlotInfo?.mongo_id,
        inputValue,
        color,
      )

      if (resp?.result) {
        toast.success(resp?.message || 'Tag assigned successfully')
      }
    } catch (error) {
      toast.error('Failed to assign tag')
    } finally {
      handleClose()
    }
  }

  const handleKeyDown = e => {
    if (!inputValue?.length) return
    if (e.key === 'Enter') {
      e.preventDefault()
      assignTagToPlot()
    }
  }

  useEffect(() => {
    const getOptions = async () => {
      setIsLoading(true)
      const tags = await plotService.getAllTagTitles()

      tags?.length
        ? setOptions(tags.map(tag => ({ label: tag })))
        : setOptions([])
      setIsLoading(false)
    }

    getOptions()

    const handleEscape = e => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keyup', handleEscape)

    return () => {
      window.removeEventListener('keyup', handleEscape)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={overlayClassName} onClick={handleClose}>
      <div className={style.modal} onClick={e => e.stopPropagation()}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className={style.heading}>
              <TagIcon className={style.tagIcon} />
              <h3 className={style.title}>Assign Tag</h3>
              <CrossIcon className={style.cross} onClick={handleClose} />
            </div>

            <Typeahead
              ref={typeaheadRef}
              className={style.typehead}
              onKeyDown={handleKeyDown}
              id='tag-modal-input'
              placeholder='Add Tag'
              emptyLabel='No Tags Found'
              newSelectionPrefix='New Tag: '
              allowNew
              positionFixed
              options={options}
              maxResults={15}
              onChange={selected => setInputValue(selected[0]?.label)}
              onInputChange={text => setInputValue(text)}
              onBlur={() => typeaheadRef.current.hideMenu()}
            />

            <div className={style.buttons}>
              <div className={style.colors}>
                {DEFAULT_TAG_COLORS.map(defaultColor => (
                  <div
                    key={defaultColor}
                    className={`${style.color} ${
                      defaultColor === color ? style.active : null
                    }`}
                    style={{ backgroundColor: defaultColor }}
                    onClick={() => setColor(defaultColor)}
                  />
                ))}

                <Tooltip text='Custom color' bottom='-40px'>
                  <ColorPickerPopup color={color} onChange={setColor} />
                </Tooltip>
              </div>

              <button className={style.close} onClick={handleClose}>
                Close
              </button>

              <button
                className={style.submit}
                disabled={inputValue?.length === 0}
                onClick={assignTagToPlot}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TagsModal
