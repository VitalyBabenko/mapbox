import { plotService } from '../../../service/plotService'
import { useToastStore } from '../../../store'
import style from './FeatureItem.module.scss'
import { BiTrashAlt as DeleteIcon } from 'react-icons/bi'

const FeatureItem = ({ isActive, feature, handleItemClick }) => {
  const { toast } = useToastStore()
  const itemClassName = isActive
    ? `${style.featureItem} ${style.active}`
    : style.featureItem

  const handleDeleteNote = async noteId => {
    try {
      const data = await plotService.removeNote(noteId)
      if (!data?.result) return
      toast.success('Note deleted')
    } catch (e) {
      return null
    }
  }

  if (!feature) return null

  return (
    <div className={itemClassName} onClick={() => handleItemClick(feature)}>
      {feature?.properties?.IDEDDP && (
        <p className={style.itemTitle}>
          Plot
          <span> {feature?.properties?.IDEDDP.replace(':', '/')}</span>
        </p>
      )}

      <p className={style.county}>{feature?.properties?.COMMUNE}</p>

      <ul className={style.fields}>
        {feature?.properties?.SURFACE && (
          <p className={style.field}>
            Surface: <span>{feature?.properties?.SURFACE} m²</span>
          </p>
        )}

        {feature?.properties?.TYPOLOGIE && (
          <p className={style.field}>
            Typologie: <span>{feature?.properties?.TYPOLOGIE}</span>
          </p>
        )}

        <p className={style.field}>
          ERGID: <span>{feature?.properties?.EGRID}</span>
        </p>
      </ul>

      {feature?.tags?.length > 0 && (
        <div className={style.tags}>
          {feature?.tags?.map((tag, index) => (
            <span key={index} className={style.tag}>
              <div
                className={style.color}
                style={tag?.color ? { background: tag.color } : null}
              />

              <span className={style.title}>{tag.title}</span>
            </span>
          ))}
        </div>
      )}

      {feature?.notes?.length > 0 && (
        <div className={style.notes}>
          <p className={style.notesTitle}>Notes:</p>

          {feature?.notes?.map(note => (
            <span
              key={note.id}
              className={style.note}
              onClick={e => e.stopPropagation()}
            >
              {note.content}

              <DeleteIcon
                className={style.deleteIcon}
                onClick={() => handleDeleteNote(note.id)}
              />
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default FeatureItem
