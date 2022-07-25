import { Backend_URL } from "../config/app";
const InvestmentService = {
  investments: (investmentId) => {
    const token = localStorage.getItem("token");

    return fetch(Backend_URL + "investments/viewideadetails/" + investmentId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },

  invest: (data) => {
    const token = localStorage.getItem("token");

    return fetch(Backend_URL + "investments/invest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
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

  getReceivedInvestments: () => {
    const token = localStorage.getItem("token");

    return fetch(Backend_URL + "investments/getReceivedInvestments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },

  getInvestments: (isPending) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user._id;

    return fetch(Backend_URL + `getInvestment/${userID}/${isPending}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },

  getInvestmentRequests: () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user._id;

    return fetch(Backend_URL + `getInvestmentRequest/${userID}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data.message;
      });
  },

  rejectInvestment: (investmentID) => {
    const token = localStorage.getItem("token");

    return fetch(Backend_URL + `rejectInvestment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        investmentID: investmentID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },

  acceptInvestment: (investmentID) => {
    const token = localStorage.getItem("token");

    return fetch(Backend_URL + `acceptInvestment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        investmentID: investmentID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },

  investmentPayment: () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user._id;

    return fetch(Backend_URL + `investmentPayment/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },

  makePayment: (params) => {
    const token = localStorage.getItem("token");

    return fetch(Backend_URL + `makepayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      body: JSON.stringify({
        ...params,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  },
};

export { InvestmentService };
