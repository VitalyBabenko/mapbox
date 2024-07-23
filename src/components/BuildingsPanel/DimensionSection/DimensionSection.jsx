import List from '../../List/List'
import ListItem from '../../List/ListItem/ListItem'

const DimensionSection = ({
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

  return (
    <List>
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
          <h3>Height Details</h3>

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
    </List>
  )
}

export default DimensionSection