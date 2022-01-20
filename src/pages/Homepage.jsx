import useGetFinances from "../hooks/useGetFinances";
import { useAuthContext } from "../context/AuthContext";
//components
import EnterAmount from "../components/EnterAmount";
import TotalAmount from "../components/TotalAmount";
import TransactionDetails from "../components/TransactionDetails";
//style
import style from "../css/Homepage.module.css";
import CategoriesChart from "../components/CategoriesChart";
import Savings3 from "../components/Savings3";

const Homepage = () => {
  const { currentUser } = useAuthContext();
  const { data, isLoading } = useGetFinances({
    fetchOnlyCurrentUser: true,
  });

  return (
    <>
      <div className={style.masterContainer}>
        {currentUser && (
          <p className={style.intro}>
            Hi, you are logged in as {currentUser.email}
          </p>
        )}
        {data && (
          <div className={style.superContainer}>
            <div
              className={`${style.transactionContainer} ${style.transaction}`}
            >
              <TransactionDetails data={data} isLoading={isLoading} />
            </div>
            <div
              className={`${style.enterAmountContainer} ${style.enterAmount}`}
            >
              <EnterAmount />
            </div>
            <div
              className={`${style.totalAmountContainer} ${style.totalAmount}`}
            >
              <TotalAmount data={data} />
            </div>
            <div className={`${style.savingsContainer} ${style.savings}`}>
              <Savings3 data={data} />
            </div>
            <div className={`${style.chartContainer} ${style.chart}`}>
              <CategoriesChart data={data} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
