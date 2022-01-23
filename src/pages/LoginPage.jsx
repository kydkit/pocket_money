import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

import style from "../css/SignupPage.module.css";

const LoginPage = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
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
        <button type="submit">Log in</button>
      </form>

      {loading ? <span>...Loading</span> : ""}
      {error ? <span>{error}</span> : ""}
      <p>
        Not a member yet?{" "}
        <Link className={style.aLink} to="/signup">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
