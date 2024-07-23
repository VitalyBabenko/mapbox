import List from '../../List/List'
import ListItem from '../../List/ListItem/ListItem'

const OwnersSection = ({ owners }) => {
  const calcAge = milliseconds => {
    let days = Math.floor(milliseconds / (1000 * 60 * 60 * 24))
    let startDate = new Date(1970, 0, 1)
    startDate.setDate(startDate.getDate() + days)
    let year = startDate.getUTCFullYear()
    let month = String(startDate.getUTCMonth() + 1).padStart(2, '0')
    let day = String(startDate.getUTCDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  if (!owners?.length) return null
  return (
    <List title='Owner(s):'>
      {owners.map(owner => (
        <ListItem key={owner?.name}>
          {owner?.name && <h3> {owner.name}</h3>}

          {owner?.date_de_naissance && (
            <ul>
              <li>
                <p>
                  Date of birth:{' '}
                  <b>
                    {calcAge(owner?.date_de_naissance?.$date?.$numberLong)}{' '}
                  </b>
                  ({owner.age} years old)
                </p>
              </li>
            </ul>
          )}
        </ListItem>
      ))}
    </List>
  )
}

export default OwnersSection
