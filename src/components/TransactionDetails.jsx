import React from "react";
import { firebaseTimestampToString } from "../helpers/time";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import style from "../css/TransactionDetails.module.css";

const TransactionDetails = ({ data, isLoading, month }) => {
  const deleteTransaction = async (id) => {
    const ref = doc(db, "finances", id);
    await deleteDoc(ref);
  };

  return (
    <div className={style.container}>
      <p className={style.mainText}>Transactions</p>
      {isLoading && <p>Loading...</p>}

      {data && (
        <>
          {data.length ? (
            <ul className={style.ulContainer}>
              {data.map((item, index) => {
                const timestamp = firebaseTimestampToString(item.timestamp);
                return (
                  <li key={index} className={style.listContainer}>
                    <div className={style.leftAlign}>
                      <span className={style.categoryImg}>
                        <img
                          src={`assets/${item.category}.svg`}
                          alt={`${item.category} icon`}
                        />
                      </span>
                      <div className={style.nameDate}>
                        <span className={`${style.itemName} item-name`}>
                          {item.name}
                        </span>
                        <span className={style.itemTime}>{timestamp}</span>
                      </div>
                    </div>
                    <div className={style.amountAndIcon}>
                      <span className={style.itemAmount}>{item.amount}</span>
                      <span>
                        <img
                          src="../assets/close-icon.svg"
                          alt="close-icon"
                          className={`${style.closeIcon} close-icon`}
                          onClick={() => deleteTransaction(item.id)}
                        />
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className={style.receiptContainer}>
              <img src="assets/receipt-solid.svg" alt="receipt" />
              <p>Start adding your transactions to see them here</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TransactionDetails;
