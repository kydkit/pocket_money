import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../css/SignupPage.module.css";
import { useAuthContext } from "../context/AuthContext";

const Signup = () => {
  const { signup } = useAuthContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting form");
    setError(null);

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("The passwords do not match");
    }

    setError(null);
    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <h1>Welcome to Pocket Money!</h1>
      <span>An app that helps track your spendings</span>

      <form onSubmit={handleSubmit} className={style.formContainer}>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          ref={emailRef}
          required
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />

        <input
          type="password"
          id="confirm"
          name="confirm"
          placeholder="Confirm password"
          ref={passwordConfirmRef}
          required
        />
        <button type="submit">Sign up</button>
      </form>
      {error ? <span>{error}</span> : ""}
      {loading ? <span>...Loading</span> : ""}
      <p>
        Already a member?{" "}
        <Link className={style.aLink} to="/login">
          Log in here
        </Link>
      </p>
    </div>
  );
};

export default Signup;
