import { Typeahead } from 'react-bootstrap-typeahead'
import { useEventStore, useTagsStore, useToastStore } from '../../store'
import style from './TagsModal.module.scss'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import { PiTagBold as TagIcon } from 'react-icons/pi'
import { useEffect, useState } from 'react'
import { plotService } from '../../service/plotService'

const testData = [
  {
    id: 2,
    user_id: 2,
    title: 'Troinex',
    created_at: null,
    updated_at: null,
    plot_id: 1,
  },
]

const TagsModal = () => {
  const { isTagModalOpen, closeTagsModal, allTags } = useTagsStore()
  const [currentPlotTags, setCurrentPlotTags] = useState(testData)
  const [inputValue, setInputValue] = useState('')
  const { clickedPlotInfo } = useEventStore()
  const toast = useToastStore()
  const overlayClassName = isTagModalOpen
    ? style.overlay
    : `${style.overlay} ${style.hidden}`

  const options = currentPlotTags?.length
    ? currentPlotTags.map(tag => ({
        label: tag.title,
      }))
    : []

  useEffect(() => {
    const getData = async () => {
      if (!clickedPlotInfo?.mongo_id) return
      const resp = await plotService.getTagsByPlotId(clickedPlotInfo?.mongo_id)

      if (!Array.isArray(resp?.data?.tags)) {
        toast.error('Failed to fetch tags')
        return
      }

      setCurrentPlotTags(resp?.data?.tags)
    }

    getData()
  }, [])

  const onSubmit = async () => {
    try {
      const resp = await plotService.assignTagToPlot(
        clickedPlotInfo?.mongo_id,
        inputValue[0]?.label,
      )
      if (resp?.error?.message?.length) {
        toast.error(resp.error.message)
        return
      }
      closeTagsModal()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className={overlayClassName} onClick={closeTagsModal}>
      <div className={style.modal} onClick={e => e.stopPropagation()}>
        <div className={style.heading}>
          <TagIcon className={style.tagIcon} />
          <h3 className={style.title}>Assign Tag</h3>
          <CrossIcon className={style.cross} onClick={closeTagsModal} />
        </div>

        <Typeahead
          allowNew
          newSelectionPrefix='New Tag: '
          positionFixed
          placeholder='Add Tag'
          onChange={setInputValue}
          options={options}
          selected={inputValue}
          maxResults={10}
          className={style.typehead}
        />

        <div className={style.buttons}>
          <button className={style.close} onClick={closeTagsModal}>
            Close
          </button>

          <button className={style.submit} onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default TagsModal
