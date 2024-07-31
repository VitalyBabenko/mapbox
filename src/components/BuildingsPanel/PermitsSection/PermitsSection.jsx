import List from '../../List/List'
import ListItem from '../../List/ListItem/ListItem'

const PermitsSection = ({ permits }) => {
  const lastPermit = permits
    ?.filter(p => p?.date_statut)
    ?.sort((a, b) => new Date(b.date_statut) - new Date(a.date_statut))[0]

  return (
    <List title='Last building permit:'>
      <ListItem>
        <ul>
          <li>
            {lastPermit.date_statut && (
              <p>
                Date: <b> {lastPermit.date_statut}</b>
              </p>
            )}

            {lastPermit.type && (
              <p>
                Building permit type: <b> {lastPermit.type}</b>
              </p>
            )}

            {lastPermit.numero && (
              <p>
                Permit number: <b> {lastPermit.numero}</b>
              </p>
            )}
          </li>
        </ul>
      </ListItem>
    </List>
  )
}

export default PermitsSection
