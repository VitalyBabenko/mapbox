import { useState } from 'react'
import { ListItem } from '../../../../components'
import style from './TransactionCard.module.scss'
import { IoIosArrowUp as ArrowIcon } from 'react-icons/io'

const TransactionCard = ({ transaction }) => {
  const [open, setOpen] = useState(false)

  const convertPrice = price => {
    if (!price) return null
    return `CHF ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")}`
  }

  return (
    <ListItem
      onClick={() => setOpen(prev => !prev)}
      className={`${style.card} ${open ? style.open : ''}`}
    >
      <hgroup>
        <h3>Affaire: {transaction?.affaire}</h3>
        <ArrowIcon className={`${style.arrow} ${open ? style.open : ''}`} />
      </hgroup>

      <h4>{convertPrice(transaction?.prix) || 'Prix non spécifié'}</h4>

      <ul>
        <li>
          <>
            {transaction?.transaction_date && (
              <p>
                Date: <b> {transaction.transaction_date}</b>
              </p>
            )}

            {transaction?.type && (
              <p>
                Type: <b> {transaction.type}</b>
              </p>
            )}

            {transaction?.type && (
              <p>
                Description: <br /> <b> {transaction.transaction}</b>
              </p>
            )}
          </>
        </li>
      </ul>
    </ListItem>
  )
}

export default TransactionCard
