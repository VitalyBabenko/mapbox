import List from '../../../components/List/List'
import TransactionCard from './TransactionCard/TransactionCard'
import { useLocale } from '../../../hooks/useLocale'

const TransactionsSection = ({ info }) => {
  const { t } = useLocale('panels.plots')

  const transactions = Array.isArray(info?.transactions)
    ? info.transactions
    : []

  const uniqueTransactions = Array.from(
    new Map(transactions.map(tx => [tx.affaire, tx])).values(),
  )

  if (!uniqueTransactions.length) return null

  return (
    <List title={t('transactions')}>
      {uniqueTransactions.map((transaction, i) => (
        <TransactionCard key={i} transaction={transaction} />
      ))}
    </List>
  )
}

export default TransactionsSection
