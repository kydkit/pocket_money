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
            <div className={style.transactionContainer}>
              <TransactionDetails data={data} isLoading={isLoading} />
            </div>
            <div className={style.enterAmountContainer}>
              <EnterAmount />
            </div>
            <div className={style.totalAmountContainer}>
              <TotalAmount data={data} />
            </div>
            <div className={style.savingsContainer}>
              <Savings3 data={data} />
            </div>
            <div className={style.chartContainer}>
              <CategoriesChart data={data} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
