import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
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

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
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

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-signup-form-page">
      <div className="login-signup-form-container">
        <form className="signup-form" onSubmit={onSignUp}>
          <div className="login-signup-errors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="signup-form-top">
              <h2>Hello</h2>
          </div>
          <div className="login-signup-form-bottom">
            <div className="login-signup-input">
              <label className="login-signup-label">User Name</label>
              <input
                type="text"
                name="username"
                className="login-signup-text-box"
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div className="login-signup-input">
              <label className="login-signup-label">Email</label>
              <input
                type="text"
                name="email"
                className="login-signup-text-box"
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className="login-signup-input">
              <label className="login-signup-label">Password</label>
              <input
                type="password"
                name="password"
                className="login-signup-text-box"
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className="login-signup-input">
              <label className="login-signup-label">Repeat Password</label>
              <input
                type="password"
                name="repeat_password"
                className="login-signup-text-box"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button className="login-signup-form-sub-btn" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
