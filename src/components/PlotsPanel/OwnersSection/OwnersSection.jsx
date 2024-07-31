import { calculateAge } from '../../../utils/calculateAge'
import { convertTimeFormat } from '../../../utils/convertTimeFormat'
import List from '../../List/List'
import ListItem from '../../List/ListItem/ListItem'

const OwnersSection = ({ plotInfo }) => {
  const owners = plotInfo?.ownership_info?.map(item => item.owner_info)

  if (!owners?.length) return null
  return (
    <List title='Owner(s):'>
      {owners.map(owner => (
        <ListItem key={owner?.name}>
          {owner?.name && <h3> {owner.name}</h3>}

          {owner?.date_de_naissance?.$date?.$numberLong && (
            <ul>
              <li>
                <p>
                  Date of birth:{' '}
                  <b>
                    {convertTimeFormat(
                      +owner?.date_de_naissance?.$date?.$numberLong,
                    )}
                  </b>{' '}
                  ({calculateAge(+owner?.date_de_naissance?.$date?.$numberLong)}{' '}
                  years old)
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
