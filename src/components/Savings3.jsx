import React, { useRef, useState } from "react";
//fire
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
//others
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import useSavingsGoal from "../hooks/useSavingsGoal";
import useGoalSubmit from "../hooks/useGoalSubmit";
import style from "../css/Savings3.module.css";

const Savings3 = ({ data }) => {
  //get the savings goals
  const goalsQuery = useSavingsGoal({ fetchOnlyCurrentUser: true });
  const goalsData = goalsQuery.data;
  //logic when submitting initial goals
  const { handleGoalSubmit, error } = useGoalSubmit();
  //state to show edit amount fields
  const [show1, setShow1] = useState(null);
  const [show2, setShow2] = useState(null);
  // refs to set initial goals
  const firstGoalAmountRef = useRef();
  const secondGoalAmountRef = useRef();
  // refs to change goals
  const changeAmount1Ref = useRef();
  const changeAmount2Ref = useRef();

  const [errorNumberOnly, setErrorNumberOnly] = useState();

  const totalSavings = Math.abs(
    data
      .filter((item) => item.category === "Savings")
      .map((item) => item.amount)
      .reduce((a, b) => a + b, 0)
  );

  //logic to change amount 1
  const handleAmount1Change = async (e) => {
    e.preventDefault();
    if (!changeAmount1Ref.current.value) {
      return;
    } else if (!changeAmount1Ref.current.value.match(RegExp("^[0-9]*$"))) {
      setErrorNumberOnly("Please only enter numbers");
      return;
    }
    // get that goal
    const goalRef = doc(db, "goals", goalsData[0]._id);
    // wait for that goal to update
    await updateDoc(goalRef, {
      firstGoalAmount: changeAmount1Ref.current.value,
    });
    //close the edit field when done
    setErrorNumberOnly("");
    setShow1(false);
  };
  //logic to change amount 2
  const handleAmount2Change = async (e) => {
    e.preventDefault();
    if (!changeAmount2Ref.current.value) {
      return;
    } else if (!changeAmount2Ref.current.value.match(RegExp("^[0-9]*$"))) {
      setErrorNumberOnly("Please only enter numbers");
      return;
    }
    // get that goal
    const goalRef = doc(db, "goals", goalsData[0]._id);
    // wait for that goal to update
    await updateDoc(goalRef, {
      secondGoalAmount: changeAmount2Ref.current.value,
    });
    //close the edit field when done
    setErrorNumberOnly("");
    setShow2(false);
  };

  return (
    <div className={style.superContainer}>
      <p className={style.mainText}>Savings Goal</p>
      {/* This is visible if original goals have been set */}
      {goalsData && goalsData.length !== 0 ? (
        <div className={style.setGoalsContainer}>
          <div className={style.eachGoal}>
            {totalSavings >= goalsData[0].firstGoalAmount ? (
              <img src="assets/Savings.svg" alt="orange-star-icon" />
            ) : (
              <img src="assets/star-white.svg" alt="white-star-icon" />
            )}
            <div className={style.amountContainer}>
              <span>{goalsData[0].firstGoalAmount}</span>
              <FontAwesomeIcon
                icon={faPen}
                onClick={() => setShow1(!show1)}
                className={style.pen}
              />
            </div>

            {/* If editing first amount, show this form */}
            {show1 ? (
              <form
                onSubmit={(e) => handleAmount1Change(e)}
                className={style.editContainer}
              >
                <input
                  type="text"
                  placeholder="amount"
                  ref={changeAmount1Ref}
                  required
                />
                <button className="">Save</button>
              </form>
            ) : (
              ""
            )}
          </div>
          {/* --------------second amount ------------- */}
          <div className={style.eachGoal}>
            {totalSavings >= goalsData[0].secondGoalAmount ? (
              <img src="assets/Savings.svg" alt="orange-star-icon" />
            ) : (
              <img src="assets/star-white.svg" alt="white-star-icon" />
            )}
            <div className={style.amountContainer}>
              <span>{goalsData[0].secondGoalAmount}</span>
              <FontAwesomeIcon
                icon={faPen}
                onClick={() => setShow2(!show2)}
                className={style.pen}
              />
            </div>

            {/* If editing second amount, show this form */}
            {show2 ? (
              <form
                onSubmit={(e) => handleAmount2Change(e)}
                className={style.editContainer}
              >
                <input
                  type="text"
                  placeholder="amount"
                  ref={changeAmount2Ref}
                  required
                />

                <button className="">Save</button>
              </form>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      {error ? <p>{error}</p> : ""}
      {errorNumberOnly ? (
        <span className={style.errorMsg}>{errorNumberOnly}</span>
      ) : (
        ""
      )}

      {/* ----This is visible if original goals haven't been set---- */}
      {goalsData && goalsData.length === 0 ? (
        <form
          onSubmit={(e) =>
            handleGoalSubmit(e, firstGoalAmountRef, secondGoalAmountRef)
          }
          className={style.formContainer}
        >
          <div>
            <input
              type="text"
              ref={firstGoalAmountRef}
              placeholder={"Set 1st goal"}
              required
            />
          </div>
          <div>
            <input
              type="text"
              ref={secondGoalAmountRef}
              placeholder={"Set 2nd goal"}
              required
            />
          </div>
          <button>Set goals!</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default Savings3;
