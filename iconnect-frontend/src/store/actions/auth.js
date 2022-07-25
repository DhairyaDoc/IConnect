import AuthService from "../../services/authService";

import {
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,
  GOOGLE_OAUTH2,
  GOOGLE_OAUTH2_BACKEND,
  AUTH_SUCCESS,
  LOGOUT,
} from "../type";

export const register = (params) => (dispatch) => {
  return AuthService.register(params).then((data) => {
    localStorage.setItem("user", JSON.stringify(data.data));
    localStorage.setItem("token", data.token);
    dispatch({ type: REGISTER, payload: data });
    return data;
  });
};

export const login = (params) => (dispatch) => {
  return AuthService.login(params).then((data) => {

    if (data.success === true) {
      localStorage.setItem("user", JSON.stringify(data.fetchedUser));
      localStorage.setItem("token", data.loginToken);
      dispatch({ type: LOGIN, payload: data });
    }

    return data;
  });
};

export const forgotPassword = (params) => (dispatch) => {
  return AuthService.forgotPassword(params).then((data) => {
    dispatch({ type: FORGOT_PASSWORD, payload: data });
    return data;
  });
};

export const googleOAuth2 = (googleResponse) => {
  return async (dispatch) => {
    if (typeof googleResponse === "undefined") {
      googleResponse = [];
    }

    const token = googleResponse.tokenId;
    const userData = {
      email: googleResponse.profileObj.email,
      firstName: googleResponse.profileObj.givenName,
      lastName: googleResponse.profileObj.familyName,
      companyName: "",
      _id: "",
      password: "",
    };
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", googleResponse.tokenId);

    dispatch({
      type: GOOGLE_OAUTH2,
      payload: { data: userData, token: token },
    });
  };
};

export const googleOAuth2Backend = (params) => (dispatch) => {
  return AuthService.oAuthLogin(params).then((data) => {
    if (data.userExisted) {
      localStorage.setItem("user", JSON.stringify(data.message));
      localStorage.setItem("token", data.token);
      dispatch({ type: GOOGLE_OAUTH2_BACKEND, payload: data });
    }
    return data;
  });
};

export const isTokenValid = () => (dispatch) => {
  return AuthService.validateToken().then((data) => {
    dispatch({ type: AUTH_SUCCESS, payload: data });
    return data;
  });
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  window.location.replace("/");
};
