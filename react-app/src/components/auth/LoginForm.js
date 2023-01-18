import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-signup-form-page">
      <div className="login-form-container">
        <form className="login-form" onSubmit={onLogin}>
          <div className="login-form-top">
            <h2 className="login-form-title">Welcome back!</h2>
            <p className="login-form-text">
              We're so excited to see you again!
            </p>
          </div>
          <div className="login-errors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="login-form-bottom">
            <div className="login-input">
              <label className="login-label" htmlFor="email">
                EMAIL
              </label>
              <input
                name="email"
                type="text"
                className="login-text-box"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className="login-input">
              <label className="login-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                name="password"
                type="password"
                className="login-text-box"
                value={password}
                onChange={updatePassword}
              />
              <button className="login-form-sub-btn" type="submit">
                Log In
              </button>
              <button
                className="login-form-sub-btn"
                type="submit"
                onClick={() => {
                  setEmail("demo@aa.io");
                  setPassword("password");
                }}
              >
                Demo Login
              </button>
            </div>
            <div className="login-form-register">
              <div className="login-form-text">Need an account?</div>
              <NavLink to="/sign-up" className="register">
                Register
              </NavLink>
            </div>
            <div className="login-form-register">
              <div className="login-form-text">Return Home</div>
              <NavLink to="/" className="register">
                ChatCord
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
