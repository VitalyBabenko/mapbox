import { convertTimeFormat } from "../../../../utils/convertTimeFormat";
import style from "./TransactionsTab.module.scss";

const TransactionsTab = ({ ownershipInfo }) => {
  const findRelevantTransaction = () => {
    let relevantTransaction = null;

    if (ownershipInfo) {
      const transactions = ownershipInfo.map((info) => info?.last_transaction);

      relevantTransaction = transactions.find(
        (transaction) => transaction !== null
      );
    }

    return relevantTransaction;
  };

  const relevantTransaction = findRelevantTransaction();

  const relevantTransactionDate = convertTimeFormat(
    relevantTransaction?.transaction_date
  );

  const convertPrice = (price) => {
    if (!price) return null;
    return `CHF ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
  };

  const relevantTransactionPrice = convertPrice(relevantTransaction?.prix);

  if (!relevantTransaction) return null;
  return (
    <div className={style.section}>
      <h3>Last transaction</h3>

      {relevantTransactionDate && (
        <p>
          Date: <span>{relevantTransactionDate}</span>
        </p>
      )}

      {relevantTransaction?.type && (
        <p>
          Type: <span>{relevantTransaction.type}</span>
        </p>
      )}

      {relevantTransactionPrice && (
        <p>
          Last price sold: <span>{relevantTransactionPrice}</span>
        </p>
      )}
    </div>
  );
};

export default TransactionsTab;
