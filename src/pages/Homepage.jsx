import { useState, useEffect } from "react";
import useGetMonth from "../hooks/useGetMonth";
import useGetFinances from "../hooks/useGetFinances";
import { useAuthContext } from "../context/AuthContext";
import { firebaseTimestampToStringMonth } from "../helpers/month";
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
    if (month > currentMonthDigit) {
      return;
    }
    setIsError(false);
    setMonth(month + 1);
  };

  //filtering only chosen month's data
  const dataCurrentMonth =
    data &&
    data.filter(
      (item) => month === firebaseTimestampToStringMonth(item.timestamp)
    );

  return (
    <>
      <div className={style.masterContainer}>
        {currentUser && (
          <div className={style.headingContainer}>
            <p className="greet">
              Hi, you are logged in as {currentUser.email}
            </p>
            <div className={style.optionContainer}>
              <FontAwesomeIcon
                onClick={handleBack}
                icon={faChevronCircleLeft}
                size="lg"
                className={`${style.arrow} back-arrow`}
              />
              <h1 className={style.monthName}>{currentMonthString}</h1>
              <FontAwesomeIcon
                onClick={handleNext}
                icon={faChevronCircleRight}
                size="lg"
                className={`${style.arrow} next-arrow`}
              />
            </div>
            <p className={isError ? style.error : ""}>
              {isError ? "We only have 2022 monthly transactions" : ""}
            </p>
          </div>
        )}
        {dataCurrentMonth && (
          <div className={style.superContainer}>
            <div className={style.transaction}>
              <TransactionDetails
                data={dataCurrentMonth}
                isLoading={isLoading}
                month={month}
              />
            </div>
            <div className={style.enterAmount}>
              <EnterAmount />
            </div>
            <div className={style.totalAmount}>
              <TotalAmount data={dataCurrentMonth} />
            </div>
            <div className={style.savings}>
              <Savings3 data={dataCurrentMonth} />
            </div>
            <div className={style.chart}>
              <CategoriesChart data={dataCurrentMonth} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
