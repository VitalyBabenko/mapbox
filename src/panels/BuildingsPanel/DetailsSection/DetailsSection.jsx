import List from '../../../components/List/List'
import ListItem from '../../../components/List/ListItem/ListItem'
import { useLocale } from '../../../hooks'

const DetailsSection = ({
  buildingArea,
  plotArea,
  livingArea,
  buildingAreaOnTheGround,
  totalGroundArea,
  buildingVolume,
  levelsAboveGround,
  levelsUnderGround,
  totalLevels,
  buildingHeight,
  constructionPeriod,
  renovationDate,
  demolitionDate,
}) => {
  const { t } = useLocale('panels.buildings')

  const isShowDimensionCard =
    plotArea ||
    buildingArea ||
    livingArea ||
    buildingAreaOnTheGround ||
    totalGroundArea ||
    buildingVolume

  const isShowHeightCard =
    levelsAboveGround || levelsUnderGround || totalLevels || buildingHeight

  const isShowConstructionCard = constructionPeriod

  return (
    <List>
      {isShowDimensionCard && (
        <ListItem>
          <h3>{t('dimension')}</h3>

          <ul>
            <li>
              {plotArea && (
                <p>
                  {t('plotArea')}: <b> {plotArea} m²</b>
                </p>
              )}

              {buildingArea && (
                <p>
                  {t('buildingArea')}: <b> {buildingArea} m²</b>
                </p>
              )}

              {livingArea && (
                <p>
                  {t('livingAreaAboveGround')}: <b> {livingArea} m²</b>
                </p>
              )}

              {livingArea && (
                <p>
                  {t('livingAreaBelowGround')}: <b> {livingArea} m²</b>
                </p>
              )}

              {buildingAreaOnTheGround && (
                <p>
                  {t('buildingAreaOnTheGround')}:{' '}
                  <b> {buildingAreaOnTheGround} m²</b>
                </p>
              )}

              {totalGroundArea && (
                <p>
                  {t('totalGroundArea')}: <b> {totalGroundArea} m²</b>
                </p>
              )}

              {buildingVolume && (
                <p>
                  {t('buildingVolume')}: <b> {buildingVolume} m³</b>
                </p>
              )}
            </li>
          </ul>
        </ListItem>
      )}

      {isShowHeightCard && (
        <ListItem>
          <h3>{t('height')}</h3>

          <ul>
            <li>
              {levelsAboveGround && (
                <p>
                  {t('levelsAboveGround')}: <b> {levelsAboveGround}</b>
                </p>
              )}

              {levelsUnderGround && (
                <p>
                  {t('levelsUnderGround')}: <b> {levelsUnderGround}</b>
                </p>
              )}

              {totalLevels && (
                <p>
                  {t('totalLevels')}: <b> {totalLevels}</b>
                </p>
              )}

              {buildingHeight ? (
                <p>
                  {t('buildingHeight')}: <b> {buildingHeight} m</b>
                </p>
              ) : null}
            </li>
          </ul>
        </ListItem>
      )}

      {isShowConstructionCard && (
        <ListItem>
          <h3>{t('construction')}</h3>

          <ul>
            <li>
              {constructionPeriod && (
                <p>
                  {t('constructionPeriod')}: <b> {constructionPeriod}</b>
                </p>
              )}

              {renovationDate && (
                <p>
                  {t('renovationYear')}: <b> {renovationDate}</b>
                </p>
              )}

              {demolitionDate && (
                <p>
                  {t('demolitionDate')}: <b> {demolitionDate}</b>
                </p>
              )}
            </li>
          </ul>
        </ListItem>
      )}
    </List>
  )
}

export default DetailsSection
