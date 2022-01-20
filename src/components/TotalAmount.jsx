import style from "../css/TotalAmount.module.css";

const TotalAmount = ({ data }) => {
  //todo isError, isLoading
  const totalBalance = data.reduce(
    (acc, item) => acc + parseInt(item.amount),
    0
  );

  const incomeBalance = data
    .map((item) => (item.amount > 0 ? item.amount : 0))
    .reduce((a, b) => a + b, 0);

  const spendingBalance = data
    .filter((item) => item.category !== "Savings")
    .map((item) => (item.amount < 0 ? item.amount : 0))
    .reduce((a, b) => a + b, 0);

  const savingsBalance = data
    .filter((item) => item.category === "Savings")
    .map((item) => item.amount)
    .reduce((a, b) => a + b, 0);

  return (
    <>
      <div className={style.container}>
        <div className={style.left}>
          <span className={style.mainText}>Current Balance</span>
          <span>Income</span>
          <span>Spending</span>
          <span>Savings</span>
        </div>
        <div className={style.right}>
          <span className={style.mainText}>{totalBalance}</span>
          <span>{incomeBalance}</span>
          <span className={style.spendingBalance}>{spendingBalance}</span>
          <span className={style.savingsBalance}>{savingsBalance}</span>
        </div>
      </div>
    </>
  );
};

// const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

export default TotalAmount;
