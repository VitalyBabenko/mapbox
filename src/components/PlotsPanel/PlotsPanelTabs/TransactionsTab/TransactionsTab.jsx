import { convertTimeFormat } from "../../../../utils/convertTimeFormat";
import style from "./TransactionsTab.module.scss";

// plot with trunsactions: Chemin des tulipiers 1

const TransactionsTab = ({ plotInfo }) => {
  const transactions = plotInfo?.ownership_info
    ?.map((info) => info?.last_transaction)
    .filter((transaction) => !!transaction?._id);

  const convertPrice = (price) => {
    if (!price) return null;
    return `CHF ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")}`;
  };

  return (
    <ul className={style.tab}>
      {transactions.map((transaction, i) => (
        <li key={i} className={style.transactionItem}>
          <p className={style.date}>
            {convertTimeFormat(transaction?.transaction_date)}
          </p>

          <p className={style.price}>{convertPrice(transaction?.prix)}</p>

          <p className={style.type}>
            Type: <span>{transaction?.type}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default TransactionsTab;
