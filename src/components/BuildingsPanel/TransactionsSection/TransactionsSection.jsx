import React from 'react'
import List from '../../List/List'
import ListItem from '../../List/ListItem/ListItem'

const TransactionsSection = ({ transactions }) => {
  const lastTransaction = transactions
    ?.filter(t => t?.transaction_date)
    ?.sort(
      (a, b) => new Date(b.transaction_date) - new Date(a.transaction_date),
    )[0]

  const convertPrice = price => {
    if (!price) return null
    return `CHF ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")}`
  }

  if (!lastTransaction) return null
  return (
    <List title='Last transaction found:'>
      <ListItem>
        <h3>{convertPrice(lastTransaction?.prix)}</h3>
        <ul>
          <li>
            <>
              {lastTransaction?.transaction_date && (
                <p>
                  Date: <b> {lastTransaction.transaction_date}</b>
                </p>
              )}

              {lastTransaction?.type && (
                <p>
                  Type: <b> {lastTransaction.type}</b>
                </p>
              )}
            </>
          </li>
        </ul>
      </ListItem>
    </List>
  )
}

export default TransactionsSection
