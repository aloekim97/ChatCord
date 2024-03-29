import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.[a-zA-Z]{2,3})+$/;

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    } else if (password !== repeatPassword) {
      let errors = [];
      errors.push("Passwords do not match. Please try again.");
      return setErrors(errors);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  useEffect(() => {
    (async () => {
      let errors = [];
      let validUser = username.trim();

      const btn = await document.getElementById("signup-form-btn-id");

      if (validUser.length < 5 || validUser.length > 10)
        errors.push("Username must be between 5 and 10 characters");
      if (!email.match(emailFormat))
        errors.push("Please enter a invalid email address");
      if (password.length < 6 || password.length > 15)
        errors.push("Password must be between 6 and 15 characters");
      if (password !== repeatPassword)
        errors.push("Passwords must match")

      await setErrors(errors);

      if (errors.length >= 1) {
        btn.disabled = true;
        btn.className = "signup-form-sub-btn-errors";
      }

      if (errors.length === 0) {
        btn.disabled = false;
        btn.className = "login-signup-form-sub-btn";
      }
    })();
  }, [username, email, password, repeatPassword]);

  if (user) {
    return <Redirect to="/@me" />;
  }

  return (
    <div className="login-signup-form-page">
      <div className="login-signup-form-container">
        <form className="signup-form" onSubmit={onSignUp}>
          <div className="signup-form-top">
            <h2 className="signup-form-title">Welcome to ChatCord!</h2>
            <h2 className="signup-form-title">Create an Account</h2>
          </div>
          <div className="signup-errors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="login-signup-form-bottom">
            <div className="login-signup-input">
              <label className="login-signup-label">USER NAME</label>
              <input
                type="text"
                name="username"
                className="login-signup-text-box"
                onChange={updateUsername}
                value={username}
                required
              ></input>
            </div>
            <div className="login-signup-input">
              <label className="login-signup-label">EMAIL</label>
              <input
                type="email"
                name="email"
                className="login-signup-text-box"
                onChange={updateEmail}
                value={email}
                required
              ></input>
            </div>
            <div className="login-signup-input">
              <label className="login-signup-label">PASSWORD</label>
              <input
                type="password"
                name="password"
                className="login-signup-text-box"
                onChange={updatePassword}
                value={password}
                required
              ></input>
            </div>
            <div className="login-signup-input">
              <label className="login-signup-label">REPEAT PASSWORD</label>
              <input
                type="password"
                name="repeat_password"
                className="login-signup-text-box"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button
              id="signup-form-btn-id"
              className="login-signup-form-sub-btn"
              type="submit"
            >
              Sign Up
            </button>
            <div className="login-form-register">
              <div className="login-form-text">Have an account?</div>
              <NavLink to="/login" className="register">
                Log In
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

export default SignUpForm;
