import List from '../../List/List'
import ListItem from '../../List/ListItem/ListItem'

const AddressSection = ({
  address,
  commune,
  buildingClass,
  buildingCategory,
  buildingStatus,
  postCode,
  floorsQuantity,
}) => {
  return (
    <List title='Address:'>
      <ListItem>
        <hgroup>
          <h3>{address}</h3>
        </hgroup>

        <h4>
          {commune}, {postCode}
        </h4>

        <ul>
          <li>
            {floorsQuantity && (
              <p>
                Quantity of floors : <b> {floorsQuantity}</b>
              </p>
            )}

            {buildingStatus && (
              <p>
                Status:
                <b> {buildingStatus}</b>
              </p>
            )}

            {buildingClass && (
              <p>
                Class:
                <b> {buildingClass}</b>
              </p>
            )}

            {buildingCategory && (
              <p>
                Category:
                <b> {buildingCategory}</b>
              </p>
            )}
          </li>
        </ul>
      </ListItem>
    </List>
  )
}

export default AddressSection
