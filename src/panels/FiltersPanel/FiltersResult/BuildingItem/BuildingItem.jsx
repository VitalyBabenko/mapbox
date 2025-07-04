import style from './BuildingItem.module.scss'
import { useLocale } from '../../../../hooks/useLocale'

const BuildingItem = ({ isActive, feature, handleItemClick }) => {
  const { t } = useLocale('panels.filters.results.buildingItem')

  const itemClassName = isActive
    ? `${style.buildingItem} ${style.active}`
    : style.buildingItem

  return (
    <div className={itemClassName} onClick={() => handleItemClick(feature)}>
      {feature?.properties?.ADDR_NAME && (
        <p className={style.itemTitle}>
          <span> {feature?.properties?.ADDR_NAME.replace(':', '/')}</span>
        </p>
      )}

      <p className={style.county}>{feature?.properties?.COMMUNE}</p>

      <ul className={style.fields}>
        {feature?.properties?.APARTS_QTY ? (
          <p className={style.field}>
            {t('unit')}: <span>{feature?.properties?.APARTS_QTY}</span>
          </p>
        ) : null}

        {feature?.properties?.NOMEN_CLAS && (
          <p className={style.field}>
            {t('class')}: <span>{feature?.properties?.NOMEN_CLAS}</span>
          </p>
        )}

        {feature?.properties?.EP_CONSTR && (
          <p className={style.field}>
            {t('constructionYear')}:{' '}
            <span>{feature?.properties?.EP_CONSTR}</span>
          </p>
        )}

        {feature?.properties?.TYPOLOGIE && (
          <p className={style.field}>
            {t('typology')}: <span>{feature?.properties?.TYPOLOGIE}</span>
          </p>
        )}

        {feature?.properties?.TRNSC_PRC && (
          <p className={style.field}>
            {t('lastTransactionPrice')}:
            <span>
              {' '}
              {feature?.properties?.TRNSC_PRC.toString().replace(
                /\B(?=(\d{3})+(?!\d))/g,
                "'",
              )}{' '}
              CHF
            </span>
          </p>
        )}
      </ul>
    </div>
  )
}

export default BuildingItem
