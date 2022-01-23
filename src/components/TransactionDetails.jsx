import React from "react";
import { firebaseTimestampToString } from "../helpers/time";
import { firebaseTimestampToStringMonth } from "../helpers/month";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import style from "../css/TransactionDetails.module.css";

const TransactionDetails = ({ data, isLoading, month }) => {
  const deleteTransaction = async (id) => {
    const ref = doc(db, "finances", id);
    await deleteDoc(ref);
  };

  const dataCurrentMonth = data.filter(
    (item) => month === firebaseTimestampToStringMonth(item.timestamp)
  );

  return (
    <>
      {isLoading && <p>Loading...</p>}

      {data && (
        <>
          {data.length ? (
            <ul className={style.ulContainer}>
              {dataCurrentMonth.map((item, index) => {
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
                        <span className={style.itemName}>{item.name}</span>
                        <span className={style.itemTime}>{timestamp}</span>
                      </div>
                    </div>
                    <div className={style.amountAndIcon}>
                      <span className={style.itemAmount}>{item.amount}</span>
                      <span>
                        <img
                          src="../assets/close-icon.svg"
                          alt="close-icon"
                          className={style.closeIcon}
                          onClick={() => deleteTransaction(item.id)}
                        />
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>You have no transactions. Start saving!</p>
          )}
        </>
      )}
    </>
  );
};

export default TransactionDetails;
