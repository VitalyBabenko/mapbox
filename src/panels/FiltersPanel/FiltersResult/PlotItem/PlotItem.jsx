import style from './PlotItem.module.scss'
import { useLocale } from '../../../../hooks/useLocale'

const PlotItem = ({ isActive, feature, handleItemClick }) => {
  const { t } = useLocale('panels.filters.results.plotItem')

  const itemClassName = isActive
    ? `${style.plotItem} ${style.active}`
    : style.plotItem

  return (
    <div className={itemClassName} onClick={() => handleItemClick(feature)}>
      {feature?.properties?.IDEDDP && (
        <p className={style.itemTitle}>
          {t('title')}
          <span> {feature?.properties?.IDEDDP.replace(':', '/')}</span>
        </p>
      )}

      <p className={style.county}>{feature?.properties?.COMMUNE}</p>

      <ul className={style.fields}>
        {feature?.properties?.SURFACE && (
          <p className={style.field}>
            {t('surface')}: <span>{feature?.properties?.SURFACE} m²</span>
          </p>
        )}

        {feature?.properties?.TYPOLOGIE && (
          <p className={style.field}>
            {t('typology')}: <span>{feature?.properties?.TYPOLOGIE}</span>
          </p>
        )}

        <p className={style.field}>
          {t('egrid')}: <span>{feature?.properties?.EGRID}</span>
        </p>

        {feature?.properties?.ADDRESS && (
          <p className={style.field}>
            {t('addresses')}: <span>{feature?.properties?.ADDRESS}</span>
          </p>
        )}
      </ul>
    </div>
  )
}

export default PlotItem
