import {
  IDEAS_POST,
  SEARCH_POST,
  GET_USER_IDEAS,
  POST_IDEA,
  CONTACT_ME,
  EDIT_IDEA,
  DELETE_IDEA,
} from "../type";

const initialState = {
  ideasPost: null,
  searchPost: null,
  postIdea: {
    message: null,
    success: null,
  },
  deleteIdea: {
    message: null,
    success: null,
  },
};

const ideaReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case IDEAS_POST: {
      return {
        ...state,
        ideasPost: payload.posts,
      };
    }

    case GET_USER_IDEAS: {
      return {
        ...state,
        userIdeas: payload.data,
      };
    }

    case SEARCH_POST: {
      return {
        ...state,
        ideasPost: payload.data,
      };
    }
    case POST_IDEA:
    case EDIT_IDEA: {
      return {
        ...state,
        postIdea: { message: payload.message, success: payload.success },
      };
    }
    case DELETE_IDEA: {
      console.log("reducer called");
      return {
        ...state,
        deleteIdea: { message: payload.message, success: payload.success },
      };
    }
    case CONTACT_ME: {
      return {
        ...state,
        contactForm: payload.contactInfo,
      };
    }

    default:
      return state;
  }
};

export default ideaReducer;
