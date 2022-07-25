import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { googleClientId } from "../../config/app";
import {
  Dialog,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import {
  emailValidation,
  stringFieldValidation,
} from "../../validators/validators";
import "./Login.css";
import {
  login,
  googleOAuth2,
  googleOAuth2Backend,
} from "../../store/actions/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [disableButton, setDisableButton] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSelectUserTypeVisible, setIsSelectUserTypeVisible] = useState(false);
  const [role, setRole] = useState("ideator");
  const [dataToSend, setdataToSend] = useState();

  const oAuthResponse = useSelector((state) => state.authReducer.oAuthResponse);

  useEffect(() => {
    if (oAuthResponse != null) {
      let dataToSend = {
        firstName: oAuthResponse.data.firstName,
        lastName: oAuthResponse.data.lastName,
        email: oAuthResponse.data.email,
        companyName: "",
        tokenId: oAuthResponse.tokenId,
      };
      setdataToSend(dataToSend);
      callOAuthBackend(dataToSend);
    }
  }, [oAuthResponse]); // eslint-disable-line react-hooks/exhaustive-deps

  const callOAuthBackend = (dataToSend) => {
    dispatch(googleOAuth2Backend(dataToSend)).then((data) => {
      if (data.success === false) {
        window.alert(data.message);
      } else if (data.userExisted) {
        navigate("/ideas");
      } else {
        setIsSelectUserTypeVisible(true);
      }
    });
  };

  const checkFieldValidation = () => {
    if (emailValidation(email) && stringFieldValidation(password)) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    checkFieldValidation();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    checkFieldValidation();
  };

  const loginUser = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).then((data) => {
      if (data.error) {
        alert(data.error);
        navigate("/login");
      } else if (data.success === false) {
        alert(data.message);
        navigate("/login");
      } else {
        navigate("/ideas");
      }
    });
  };

  const responseGoogleSuccess = (response) => {
    localStorage.setItem("googleAuth", JSON.stringify(response));
    dispatch(googleOAuth2(response));
  };

  const responseGoogleFailure = (response) => {
    console.log(response);
  };

  const logout = (response) => {
    console.log(response);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setIsSelectUserTypeVisible(false);
  };

  const handleRoleChange = (event) => {
    event.preventDefault();
    setRole(event.target.value);
    setdataToSend({ ...dataToSend, role: event.target.value });
  };

  return (
    <div className="my-card">
      <Dialog onClose={handleClose} open={isSelectUserTypeVisible}>
        <DialogContent>
          <DialogTitle>Please Select your user type</DialogTitle>
          <FormControl className="left radioGroup">
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
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleClose(e)}>Cancel</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              callOAuthBackend(dataToSend);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <div className="card login-card">
        <h3>Login</h3>

        <input
          type="email"
          onChange={(event) => handleEmailChange(event)}
          placeholder="Email"
          value={email}
          required
        />
        <input
          type="password"
          onChange={(event) => handlePasswordChange(event)}
          placeholder="Password"
          value={password}
          required
        />
        <button
          className="btn blue darken-1 login-btn"
          type="submit"
          name="action"
          disabled={disableButton}
          onClick={(event) => loginUser(event)}
        >
          Submit
        </button>
        <br />
        <br />

        <GoogleLogin
          clientId={googleClientId}
          buttonText="Login with Google"
          cookiePolicy={"single_host_origin"}
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleFailure}
          isSignedIn={false}
        />
        <br />
        <br />

        <div style={{ display: "none" }}>
          <GoogleLogout
            clientId={googleClientId}
            buttonText="Logout"
            onLogoutSuccess={logout}
          />
        </div>
        <h6>
          <Link className="navigation-link" to={"/forgotpassword"}>
            Forgot Password?
          </Link>
        </h6>
        <h6>
          <Link className="navigation-link" to={"/register"}>
            Don't have an account?
          </Link>
        </h6>
      </div>
    </div>
  );
};

export default Login;
