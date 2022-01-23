import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import style from "../css/MonthOption.module.css";
import useGetMonth from "../hooks/useGetMonth";
import TransactionDetails from "./TransactionDetails";

const MonthlyTransactions = ({ data, isLoading }) => {
  const { currentMonthDigit } = useGetMonth();

  const [month, setMonth] = useState(currentMonthDigit);
  const [currentMonthString, setCurrentMonthString] = useState();
  const [isError, setIsError] = useState();

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

  useEffect(() => {
    console.log({ month });
    setCurrentMonthString(monthDigitToString(month));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

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

  return (
    <>
      <div className={style.container}>
        <div>
          <h1 className={style.mainText}>Transactions</h1>
        </div>

        <div className={style.optionContainer}>
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
        <TransactionDetails data={data} isLoading={isLoading} month={month} />
      </div>
    </>
  );
};

export default MonthlyTransactions;
