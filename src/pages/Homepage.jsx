import { useState, useEffect } from "react";
import useGetFinances from "../hooks/useGetFinances";
import { useAuthContext } from "../context/AuthContext";
import { firebaseTimestampToStringMonth } from "../helpers/month";
import useGetMonth from "../hooks/useGetMonth";
//components
import EnterAmount from "../components/EnterAmount";
import TotalAmount from "../components/TotalAmount";
import TransactionDetails from "../components/TransactionDetails";
import CategoriesChart from "../components/CategoriesChart";
import Savings3 from "../components/Savings3";
//style
import style from "../css/Homepage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import styleMonthly from "../css/MonthOption.module.css";

const Homepage = () => {
  const { currentUser } = useAuthContext();
  const { data, isLoading } = useGetFinances({
    fetchOnlyCurrentUser: true,
  });
  const { currentMonthDigit } = useGetMonth();
  const [month, setMonth] = useState(currentMonthDigit);
  const [isError, setIsError] = useState();
  const [currentMonthString, setCurrentMonthString] = useState();

  useEffect(() => {
    console.log({ month });
    setCurrentMonthString(monthDigitToString(month));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  //convert numeric month to string
  const monthDigitToString = () => {
    let monthx;
    switch (month) {
      case 0:
        monthx = "January";
        break;
      case 1:
        monthx = "February";
        break;
      case 2:
        monthx = "March";
        break;
      case 3:
        monthx = "April";
        break;
      case 4:
        monthx = "May";
        break;
      case 5:
        monthx = "June";
        break;
      case 6:
        monthx = "July";
        break;
      case 7:
        monthx = "August";
        break;
      case 8:
        monthx = "September";
        break;
      case 9:
        monthx = "October";
        break;
      case 10:
        monthx = "November";
        break;
      case 11:
        monthx = "December";
        break;

      default:
        monthx = "invalid monthx";
    }
    return monthx;
  };

  const handleBack = () => {
    console.log("going back");
    console.log({ month });
    if (month === 0) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setMonth(month - 1);
  };

  const handleNext = () => {
    if (month === 11) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setMonth(month + 1);
  };

  const dataCurrentMonth = data.filter(
    (item) => month === firebaseTimestampToStringMonth(item.timestamp)
  );

  return (
    <>
      <div className={style.masterContainer}>
        {currentUser && (
          <p className={style.intro}>
            Hi, you are logged in as {currentUser.email}
          </p>
        )}
        {data && (
          <div className={styleMonthly.superContainer}>
            <div className={styleMonthly.container}>
              <div>
                <h1 className={styleMonthly.mainText}>Transactions</h1>
              </div>

              <div className={styleMonthly.optionContainer}>
                <FontAwesomeIcon
                  onClick={handleBack}
                  icon={faChevronCircleLeft}
                  size="lg"
                  className={style.arrow}
                />
                <span className={style.monthName}>{currentMonthString}</span>
                <FontAwesomeIcon
                  onClick={handleNext}
                  icon={faChevronCircleRight}
                  size="lg"
                  className={style.arrow}
                />
              </div>
              <p className={isError ? style.error : ""}>
                {isError ? "We only have 2022 monthly transactions" : ""}
              </p>
              <TransactionDetails
                data={dataCurrentMonth}
                isLoading={isLoading}
                month={month}
              />
            </div>
            <div
              className={`${style.enterAmountContainer} ${style.enterAmount}`}
            >
              <EnterAmount />
            </div>
            <div
              className={`${style.totalAmountContainer} ${style.totalAmount}`}
            >
              <TotalAmount data={dataCurrentMonth} />
            </div>
            <div className={`${style.savingsContainer} ${style.savings}`}>
              <Savings3 data={data} />
            </div>
            <div className={`${style.chartContainer} ${style.chart}`}>
              <CategoriesChart data={dataCurrentMonth} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
