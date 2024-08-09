import List from '../../../components/List/List'
import ListItem from '../../../components/List/ListItem/ListItem'

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
    <List title='Details:'>
      {isShowDimensionCard && (
        <ListItem>
          <h3>Dimension</h3>

          <ul>
            <li>
              {plotArea && (
                <p>
                  Plot surface: <b> {plotArea} m²</b>
                </p>
              )}

              {buildingArea && (
                <p>
                  Building surface: <b> {buildingArea} m²</b>
                </p>
              )}

              {livingArea && (
                <p>
                  Living surface above ground: <b> {livingArea} m²</b>
                </p>
              )}

              {livingArea && (
                <p>
                  Living surface above ground: <b> {livingArea} m²</b>
                </p>
              )}

              {buildingAreaOnTheGround && (
                <p>
                  Building surface on ground:{' '}
                  <b> {buildingAreaOnTheGround} m²</b>
                </p>
              )}

              {totalGroundArea && (
                <p>
                  Total ground surface: <b> {totalGroundArea} m²</b>
                </p>
              )}

              {buildingVolume && (
                <p>
                  Building volume: <b> {buildingVolume} m³</b>
                </p>
              )}
            </li>
          </ul>
        </ListItem>
      )}

      {isShowHeightCard && (
        <ListItem>
          <h3>Height</h3>

          <ul>
            <li>
              {levelsAboveGround && (
                <p>
                  Levels above ground: <b> {levelsAboveGround}</b>
                </p>
              )}

              {levelsUnderGround && (
                <p>
                  Levels under ground: <b> {levelsUnderGround}</b>
                </p>
              )}

              {totalLevels && (
                <p>
                  Total levels: <b> {totalLevels}</b>
                </p>
              )}

              {buildingHeight ? (
                <p>
                  Building height: <b> {buildingHeight} m</b>
                </p>
              ) : null}
            </li>
          </ul>
        </ListItem>
      )}

      {isShowConstructionCard && (
        <ListItem>
          <h3>Construction</h3>

          <ul>
            <li>
              {constructionPeriod && (
                <p>
                  Construction period: <b> Période de {constructionPeriod}</b>
                </p>
              )}

              {renovationDate && (
                <p>
                  Renovation year: <b> {renovationDate}</b>
                </p>
              )}

              {demolitionDate && (
                <p>
                  Demolition date: <b> {demolitionDate}</b>
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
