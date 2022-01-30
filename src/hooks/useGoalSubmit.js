import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
//fire
import { useAuthContext } from "../context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const useGoalSubmit = () => {
  const { currentUser } = useAuthContext();
  const [error, setError] = useState();

  const handleGoalSubmit = async (
    e,
    firstGoalAmountRef,
    secondGoalAmountRef
  ) => {
    e.preventDefault();

    if (
      !firstGoalAmountRef.current.value ||
      !secondGoalAmountRef.current.value
    ) {
      setError("Please enter both amount");
    } else if (
      !firstGoalAmountRef.current.value.match(RegExp("^[0-9]*$")) ||
      !secondGoalAmountRef.current.value.match(RegExp("^[0-9]*$"))
    ) {
      setError("Please only enter numbers");
      return;
    }

    const goalId = uuidv4();
    let firstGoalAmount = firstGoalAmountRef.current.value;
    let secondGoalAmount = secondGoalAmountRef.current.value;

    const goalRef = collection(db, "goals");

    await addDoc(goalRef, {
      goalId,
      firstGoalAmount,
      secondGoalAmount,
      user: currentUser.uid,
    });
    setError(null);
  };
  return { error, handleGoalSubmit };
};

export default useGoalSubmit;
