import { calculateAge } from '../../../utils/calculateAge'
import { convertTimeFormat } from '../../../utils/convertTimeFormat'
import List from '../../../components/List/List'
import ListItem from '../../../components/List/ListItem/ListItem'

const OwnersSection = ({ plotInfo, locale }) => {
  const sectionTitle = {
    en: 'Owner(s):',
    fr: 'Propriétaire(s):',
    de: 'Eigentümer',
  }

  if (!plotInfo?.owners?.length) return null
  return (
    <List title={sectionTitle[locale]}>
      {plotInfo.owners.map((owner, i) => (
        <ListItem key={`${owner?.name} ${i}`}>
          {owner?.name && <h3> {owner.name}</h3>}

          {owner?.date_de_naissance && (
            <ul>
              <li>
                <p>
                  Date of birth:{' '}
                  <b>{convertTimeFormat(owner?.date_de_naissance)}</b> (
                  {calculateAge(owner?.date_de_naissance)} years old)
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
