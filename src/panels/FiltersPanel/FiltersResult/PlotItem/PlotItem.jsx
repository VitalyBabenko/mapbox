import style from './PlotItem.module.scss'

const PlotItem = ({ isActive, feature, handleItemClick }) => {
  const itemClassName = isActive
    ? `${style.plotItem} ${style.active}`
    : style.plotItem

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
    </div>
  )
}

export default PlotItem
