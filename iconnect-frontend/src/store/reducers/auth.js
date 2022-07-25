import {
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,
  GOOGLE_OAUTH2,
  GOOGLE_OAUTH2_BACKEND,
  LOGOUT,
  AUTH_SUCCESS,
} from "../type";

const initialState = {
  user: null,
  token: "",
  isLoggedIn: null,
  message: "",
  success: false,
  oAuthResponse: null,
  ideasPost: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER:
      return {
        ...state,
        user: payload.data,
        token: payload.token,
        isLoggedIn: true,
      };

    case LOGIN:
      return {
        ...state,
        user: payload.fetchedUser,
        token: payload.loginToken,
        isLoggedIn: true,
      };

    case FORGOT_PASSWORD:
      return {
        ...state,
        message: payload.message,
        success: payload.success,
      };

    case GOOGLE_OAUTH2_BACKEND: {
      return {
        ...state,
        user: payload.message,
        isLoggedIn: true,
      };
    }

    case GOOGLE_OAUTH2: {
      return {
        ...state,
        oAuthResponse: payload,
        token: payload.tokenId,
      };
    }
    case AUTH_SUCCESS: {
      if (payload.success === true) {
        return {
          ...state,
          isLoggedIn: true,
          token: localStorage.getItem("token"),
          user: JSON.parse(localStorage.getItem("user")),
        };
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("googleAuth");
        return {
          ...state,
          token: null,
          isLoggedIn: false,
          user: null,
        };
      }
    }

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
