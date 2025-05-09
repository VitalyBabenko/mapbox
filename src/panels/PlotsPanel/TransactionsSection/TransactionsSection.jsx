import { convertTimeFormat } from '../../../utils/convertTimeFormat'
import List from '../../../components/List/List'
import ListItem from '../../../components/List/ListItem/ListItem'

const TransactionsSection = ({ plotInfo }) => {
  const transactions = plotInfo?.ownership_info
    ?.map(info => info?.last_transaction)
    ?.filter(transaction => !!transaction?._id)

  const convertPrice = price => {
    if (!price) return null
    return `CHF ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")}`
  }

  if (!transactions?.length) return null
  return (
    <List title='Transaction(s):'>
      {transactions.map((transaction, i) => (
        <ListItem key={i}>
          <hgroup>
            <h3>{convertPrice(transaction?.prix)}</h3>

            <p>{convertTimeFormat(transaction?.transaction_date)}</p>
          </hgroup>

          <ul>
            <li>
              {transaction?.type && (
                <p>
                  Type: <b>{transaction?.type}</b>
                </p>
              )}

              {transaction?.plots?.[0]?.pourmille_ppe && (
                <p>
                  Pourmille: <b>{transaction?.plots?.[0]?.pourmille_ppe}</b>
                </p>
              )}

              {transaction?.plots?.[0]?.cumulative_pourmille_ppe && (
                <p>
                  Cumulated pourmille:{' '}
                  <b>{transaction?.plots?.[0]?.cumulative_pourmille_ppe}</b>
                </p>
              )}
            </li>
          </ul>
        </ListItem>
      ))}
    </List>
  )
}

export default TransactionsSection
