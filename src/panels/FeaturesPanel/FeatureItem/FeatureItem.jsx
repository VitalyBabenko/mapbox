import style from './FeatureItem.module.scss'

const FeatureItem = ({ isActive, feature, handleItemClick }) => {
  const itemClassName = isActive
    ? `${style.featureItem} ${style.active}`
    : style.featureItem

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
            <span
              key={index}
              className={style.tag}
              style={
                tag?.color
                  ? {
                      borderColor: tag.color,
                    }
                  : null
              }
            >
              <span className={style.title}>{tag.title}</span>

              <div
                className={style.background}
                style={tag?.color ? { backgroundColor: tag.color } : null}
              />
            </span>
          ))}
        </div>
      )}

      {feature?.notes?.length > 0 && (
        <div className={style.notes}>
          {feature?.notes?.map((note, index) => (
            <span key={index} className={style.note}>
              {note}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default FeatureItem
