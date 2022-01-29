import { useRef, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";
//style
import style from "../css/EnterAmount.module.css";

const EnterAmount = () => {
  const { currentUser } = useAuthContext();
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);

  const amountRef = useRef();
  const nameRef = useRef();
  const incomeRef = useRef();
  const savingsRef = useRef();
  const householdRef = useRef();
  const transportRef = useRef();
  const foodRef = useRef();
  const shoppingRef = useRef();
  const otherRef = useRef();

  const handleTransaction = async (e) => {
    e.preventDefault();

    if (!amountRef.current.value.length || !nameRef.current.value.length) {
      setError("Please enter transaction name and/or amount");
      return;
    } else if (!category) {
      setError("Please select a category");
      return;
    } else if (!amountRef.current.value.match(RegExp("^[0-9]*$"))) {
      setError("Please enter a number");
      return;
    }

    await addDoc(collection(db, "finances"), {
      name: nameRef.current.value,
      amount:
        category === "Income"
          ? parseInt(amountRef.current.value)
          : -parseInt(amountRef.current.value),
      timestamp: serverTimestamp(),
      owner: currentUser.uid,
      category,
    });

    nameRef.current.value = "";
    amountRef.current.value = "";
    incomeRef.current.checked = false;
    savingsRef.current.checked = false;
    householdRef.current.checked = false;
    transportRef.current.checked = false;
    foodRef.current.checked = false;
    shoppingRef.current.checked = false;
    otherRef.current.checked = false;
    setCategory(null);
    setError(null);
  };

  const handleCategory = (cat) => {
    setCategory(cat);
  };

  const handleAmount = (e) => {
    if (!e.target.value.trim()) {
      setError(null);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();

    nameRef.current.value = "";
    amountRef.current.value = "";
    incomeRef.current.checked = false;
    savingsRef.current.checked = false;
    householdRef.current.checked = false;
    transportRef.current.checked = false;
    foodRef.current.checked = false;
    shoppingRef.current.checked = false;
    otherRef.current.checked = false;
    setCategory(null);
    setError(null);
  };

  return (
    <div>
      <form className={style.form} autoComplete="off">
        <div className={style.inputContainer}>
          <input type="text" placeholder="Name" name="name" ref={nameRef} />
          <input
            type="text"
            placeholder="Amount"
            name="amount"
            ref={amountRef}
            onChange={handleAmount}
          />
        </div>
        {error ? <span>{error}</span> : <span></span>}

        {/* radio buttons */}
        <div className={style.radioContainer}>
          <p>Deposits</p>
          <div className={style.radiotoolbar}>
            <input
              type="radio"
              value="Income"
              name="category"
              id="categoryIncome"
              ref={incomeRef}
              onChange={(e) => handleCategory(e.target.value)}
            />
            <label htmlFor="categoryIncome">Income</label>
          </div>

          <p>Withdrawals</p>

          <div className={style.radiotoolbar}>
            <input
              type="radio"
              value="Household"
              name="category"
              id="categoryHousehold"
              ref={householdRef}
              onChange={(e) => handleCategory(e.target.value)}
            />
            <label htmlFor="categoryHousehold">Household</label>
            <input
              type="radio"
              value="Transport"
              name="category"
              id="categoryTransport"
              ref={transportRef}
              onChange={(e) => handleCategory(e.target.value)}
            />
            <label htmlFor="categoryTransport">Transport</label>
            <input
              type="radio"
              value="Food"
              name="category"
              id="categoryFood"
              ref={foodRef}
              onChange={(e) => handleCategory(e.target.value)}
            />
            <label htmlFor="categoryFood">Food</label>
            <input
              type="radio"
              value="Shopping"
              name="category"
              id="categoryShopping"
              ref={shoppingRef}
              onChange={(e) => handleCategory(e.target.value)}
            />
            <label htmlFor="categoryShopping">Shopping</label>
            <input
              type="radio"
              value="Other"
              name="category"
              id="categoryOther"
              ref={otherRef}
              onChange={(e) => handleCategory(e.target.value)}
            />
            <label htmlFor="categoryOther">Other</label>
            <input
              type="radio"
              value="Savings"
              name="category"
              id="categorySavings"
              ref={savingsRef}
              onChange={(e) => handleCategory(e.target.value)}
            />
            <label htmlFor="categorySavings">Savings*</label>
          </div>
        </div>

        <div className={style.submitButtons}>
          <button onClick={handleTransaction}>Enter Transaction</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};
export default EnterAmount;
