import List from '../../../components/List/List'
import TransactionCard from './TransactionCard/TransactionCard'

const TransactionsSection = ({ info }) => {
  const transactions = Array.from(new Set(info?.transactions))

  if (!transactions?.length) return null
  return (
    <List title='Transaction(s):'>
      {transactions.map(transaction => (
        <TransactionCard transaction={transaction} />
      ))}
    </List>
  )
}

export default TransactionsSection
