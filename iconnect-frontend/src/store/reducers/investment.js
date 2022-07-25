import {
  INVESTMENT_IDEA,
  INVEST,
  GET_RECEIVED_INVESTMENTS,
  GET_INVESTMENTS,
  GET_INVESTMENT_REQUEST,
  GET_INVESTMENT_PAYMENT,
} from "../type";

const initialState = {
  investmentDetails: null,
  message: "",
  success: false,
  receievedInvestments: null,
  myInvestments: null,
  pendingInvestment: null,
  investmentPayment: null,
};

const investmentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case INVESTMENT_IDEA: {
      return {
        ...state,
        investmentDetails: payload.investments,
      };
    }
    case INVEST: {
      return {
        ...state,
        message: payload.message,
        success: payload.success,
      };
    }
    case GET_RECEIVED_INVESTMENTS: {
      return {
        ...state,
        receievedInvestments: payload.message,
        success: payload.success,
      };
    }

    case GET_INVESTMENTS: {
      return {
        ...state,
        myInvestments: payload.document,
        success: payload.success,
      };
    }

    case GET_INVESTMENT_REQUEST: {
      return {
        ...state,
        pendingInvestment: payload.data,
        success: true,
      };
    }

    case GET_INVESTMENT_PAYMENT: {
      return {
        ...state,
        investmentPayment: payload,
        success: true,
      };
    }

    default:
      return state;
  }
};

export default investmentReducer;
