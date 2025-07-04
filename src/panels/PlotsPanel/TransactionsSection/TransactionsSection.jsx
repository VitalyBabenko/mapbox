import List from '../../../components/List/List'
import TransactionCard from './TransactionCard/TransactionCard'
import { useLocale } from '../../../hooks/useLocale'

const TransactionsSection = ({ info }) => {
  const { t } = useLocale('panels.plots')

  const transactions = Array.from(new Set(info?.transactions))

  if (!transactions?.length) return null
  return (
    <List title={t('transactions')}>
      {transactions.map(transaction => (
        <TransactionCard transaction={transaction} />
      ))}
    </List>
  )
}

export default TransactionsSection
