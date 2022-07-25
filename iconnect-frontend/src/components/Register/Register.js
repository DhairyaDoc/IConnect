import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import {
  emailValidation,
  stringFieldValidation,
} from "../../validators/validators";
import "./Register.css";
import { register } from "../../store/actions/auth";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [disableButton, setDisableButton] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("ideator");

  const checkFieldValidation = () => {
    if (
      emailValidation(email) &&
      stringFieldValidation(firstName) &&
      stringFieldValidation(lastName) &&
      stringFieldValidation(password) &&
      stringFieldValidation(role)
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    checkFieldValidation();
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    checkFieldValidation();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    checkFieldValidation();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    checkFieldValidation();
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
    checkFieldValidation();
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
    checkFieldValidation();
  };

  const registerUser = (e) => {
    dispatch(
      register({ firstName, lastName, email, password, companyName, role })
    ).then((data) => {
      if (data.error) {
        window.alert(data.error);
      } else {
        console.log("User registered successfully!");
        navigate("/ideas");
      }
    });
    e.preventDefault();
  };

  return (
    <div className="my-card">
      <div className="card register-card">
        <h3>Register</h3>
        <form onSubmit={(e) => registerUser(e)}>
          <input
            type="text"
            onChange={(event) => handleFirstNameChange(event)}
            placeholder="First Name"
            value={firstName}
            required
          />
          <input
            type="text"
            onChange={(event) => handleLastNameChange(event)}
            placeholder="Last Name"
            value={lastName}
            required
          />
          <input
            type="email"
            onChange={(event) => handleEmailChange(event)}
            placeholder="Email"
            value={email}
            required
          />

          <FormControl className="left radioGroup">
            <FormLabel id="demo-radio-buttons-group-label">
              Register as
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={role}
              onChange={handleRoleChange}
            >
              <FormControlLabel
                value="ideator"
                control={<Radio color="primary" />}
                label="Ideator"
              />
              <FormControlLabel
                value="investor"
                control={<Radio color="primary" />}
                label="Investor"
              />
            </RadioGroup>
          </FormControl>
          {role === "investor" ? (
            <input
              type="text"
              onChange={(event) => handleCompanyNameChange(event)}
              placeholder="Company Name"
              value={companyName}
              required
            />
          ) : null}
          <input
            type="password"
            onChange={(event) => handlePasswordChange(event)}
            placeholder="Password"
            value={password}
            required
          />
          <button
            className="btn blue darken-1 register-btn"
            type="submit"
            name="action"
            disabled={disableButton}
            onSubmit={(event) => registerUser(event)}
          >
            Submit
          </button>
        </form>
        <h6>
          <Link className="navigation-link" to={"/login"}>
            Already have an account?
          </Link>
        </h6>
      </div>
    </div>
  );
};

export default Register;
