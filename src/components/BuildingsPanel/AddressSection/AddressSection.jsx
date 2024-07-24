import List from '../../List/List'
import ListItem from '../../List/ListItem/ListItem'

const AddressSection = ({
  address,
  commune,
  postCode,
  buildingNumber,
  isPPE,
  buildingTypology,
  buildingCategory,
  buildingType,
  buildingClass,
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
          <li style={{ gap: '8px' }}>
            {buildingNumber && (
              <p>
                Building: <br /> <b> {buildingNumber}</b>
              </p>
            )}

            {isPPE && (
              <p>
                Building regime type: <br /> <b> {buildingNumber}</b>
              </p>
            )}

            {buildingTypology && (
              <p>
                Building typology: <br /> <b> {buildingTypology}</b>
              </p>
            )}

            {buildingCategory && (
              <p>
                Building category: <br />
                <b> {buildingCategory}</b>
              </p>
            )}

            {buildingType && (
              <p>
                Building type: <br /> <b> {buildingType}</b>
              </p>
            )}

            {buildingClass && (
              <p>
                Building class: <br /> <b> {buildingClass}</b>
              </p>
            )}
          </li>
        </ul>
      </ListItem>
    </List>
  )
}

export default AddressSection
