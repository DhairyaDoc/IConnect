import { InvestmentService } from "../../services/investmentService.js";

import {
  INVESTMENT_IDEA,
  INVEST,
  GET_RECEIVED_INVESTMENTS,
  GET_INVESTMENTS,
  GET_INVESTMENT_REQUEST,
  GET_INVESTMENT_PAYMENT,
} from "../type";

export const investment = (params) => (dispatch) => {
  return InvestmentService.investments(params).then((data) => {
    dispatch({ type: INVESTMENT_IDEA, payload: data });

    return data;
  });
};

export const invest = (params) => (dispatch) => {
  return InvestmentService.invest(params).then((data) => {
    dispatch({ type: INVEST, payload: data });

    return data;
  });
};

export const getReceivedInvestments = () => (dispatch) => {
  return InvestmentService.getReceivedInvestments().then((data) => {
    dispatch({ type: GET_RECEIVED_INVESTMENTS, payload: data });

    return data;
  });
};

export const getInvestments = (isPending) => (dispatch) => {
  return InvestmentService.getInvestments(isPending).then((data) => {
    dispatch({ type: GET_INVESTMENTS, payload: data });
    return data;
  });
};

export const getPendingInvestment = () => (dispatch) => {
  return InvestmentService.getInvestmentRequests().then((data) => {
    dispatch({ type: GET_INVESTMENT_REQUEST, payload: { data: data } });
    return data;
  });
};

export const acceptInvestment = (investmentID) => (dispatch) => {
  return InvestmentService.acceptInvestment(investmentID).then((data) => {
    return data;
  });
};

export const rejectInvestment = (investmentID) => (dispatch) => {
  return InvestmentService.rejectInvestment(investmentID).then((data) => {
    return data;
  });
};

export const investmentPayment = () => (dispatch) => {
  return InvestmentService.investmentPayment().then((result) => {
    dispatch({ type: GET_INVESTMENT_PAYMENT, payload: result.data });
    return result;
  });
};

export const makeInvestmentPayment = (params) => (dispatch) => {
  return InvestmentService.makePayment(params).then((result) => {
    return result;
  })
}

export default investment;
