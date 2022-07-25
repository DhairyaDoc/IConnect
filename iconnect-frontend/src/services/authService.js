import { Backend_URL } from "../config/app";

const AuthService = {
  register: (data) => {
    return fetch(Backend_URL + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },

  login: (data) => {
    return fetch(Backend_URL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("== " , data)
        return data;
      });
  },

  forgotPassword: (data) => {
    return fetch(Backend_URL + "forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log("error", err);
      });
  },

  oAuthLogin: (data) => {
    return fetch(Backend_URL + "oAuthLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log("error", err);
      });
  },

  validateToken: () => {
    var token = localStorage.getItem("token");
    return fetch(Backend_URL + "validateToken", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log("error", err);
      });
  },
};

export default AuthService;
