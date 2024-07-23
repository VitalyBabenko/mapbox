import List from '../../List/List'
import ListItem from '../../List/ListItem/ListItem'

const DimensionSection = ({
  buildingArea,
  plotArea,
  livingArea,
  buildingAreaOnTheGround,
}) => {
  return (
    <List title='Dimension:'>
      <ListItem>
        <ul style={{ marginTop: '0' }}>
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
                Building surface on ground: <b> {buildingAreaOnTheGround} m²</b>
              </p>
            )}
          </li>
        </ul>
      </ListItem>
    </List>
  )
}

export default DimensionSection
