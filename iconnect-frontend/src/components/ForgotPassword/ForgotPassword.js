import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emailValidation } from "../../validators/validators";
import "./ForgotPassword.css";
import { forgotPassword } from "../../store/actions/auth";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [disableButton, setDisableButton] = useState(true);

  const [email, setEmail] = useState("");
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");

  const checkFieldValidation = () => {
    if (emailValidation(email)) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    checkFieldValidation();
  };

  const ForgotPassword = (e) => {
    dispatch(forgotPassword({ email })).then((data) => {
      if (!data.success) {
        setMessageError(data.message);
        setMessageSuccess("");
      } else {
        setMessageError("");
        setMessageSuccess(
          "An email has been sent to you to reset your password."
        );
      }
    });
    e.preventDefault();
  };

  return (
    <div className="my-card">
      <div className="card register-card">
        <h3>Forgot Password</h3>
        <form onSubmit={(event) => ForgotPassword(event)}>
          <input
            type="email"
            onChange={(event) => handleEmailChange(event)}
            placeholder="Email"
            value={email}
            required
          />

          {messageError !== "" ? (
            <h6 className="error">{messageError}</h6>
          ) : null}
          {messageSuccess !== "" ? (
            <h6 className="success">{messageSuccess}</h6>
          ) : null}
          <button
            className="btn blue darken-1 register-btn"
            type="submit"
            name="action"
            disabled={disableButton}
          >
            Submit
          </button>
          <h6>
            <Link className="navigation-link" to={"/login"}>
              Login
            </Link>
          </h6>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
