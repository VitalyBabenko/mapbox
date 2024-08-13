import List from '../../../components/List/List'
import ListItem from '../../../components/List/ListItem/ListItem'
import Tooltip from '../../../components/Tooltip/Tooltip'
import { BiLinkExternal as LinkIcon } from 'react-icons/bi'
import style from './PermitsSection.module.scss'

const PermitsSection = ({ permits }) => {
  const lastPermit = permits
    ?.filter(p => p?.date_statut)
    ?.sort((a, b) => new Date(b.date_statut) - new Date(a.date_statut))[0]

  const HeadingLink = ({ link }) => {
    if (!link) return null
    return (
      <a target='_blank' href={link} rel='noreferrer'>
        <Tooltip text='Link SAD' top='-35px' right='-16px'>
          <LinkIcon />
        </Tooltip>
      </a>
    )
  }

  if (!lastPermit) return null
  return (
    <List title='Last building permit:'>
      <ListItem>
        {lastPermit?.url && (
          <hgroup className={style.hgroup}>
            <HeadingLink link={lastPermit?.url} />
          </hgroup>
        )}

        <ul>
          <li>
            {lastPermit?.date_statut && (
              <p>
                Date: <b> {lastPermit.date_statut}</b>
              </p>
            )}

            {lastPermit?.type && (
              <p>
                Building permit type: <b> {lastPermit.type}</b>
              </p>
            )}

            {lastPermit?.numero && (
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
