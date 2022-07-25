import { IdeaService } from "../../services/ideaService";
import { searchIdeaService } from "../../services/ideaService";
import { contactMeService } from "../../services/ideaService";

import {
  GET_USER_IDEAS,
  IDEAS_POST,
  SEARCH_POST,
  POST_IDEA,
  CONTACT_ME,
  EDIT_IDEA,
  DELETE_IDEA,
} from "../type";

export const ideas = () => (dispatch) => {
  return IdeaService.ideas().then((posts) => {
    dispatch({ type: IDEAS_POST, payload: posts });
    return posts;
  });
};

export const userIdeas = (params) => (dispatch) => {
  return IdeaService.getUserIdeas(params).then((ideas) => {
    dispatch({ type: GET_USER_IDEAS, payload: { data: ideas.ideas } });
    return ideas;
  });
};

export const getIdeasBySearch = (params) => (dispatch) => {
  try {
    return searchIdeaService.searchideas(params).then((data) => {
      dispatch({ type: SEARCH_POST, payload: data });
      return data;
    });
  } catch (error) {
    console.log(error);
  }
};

export const postIdeas = (params) => (dispatch) => {
  try {
    return IdeaService.postIdeas(params).then((data) => {
      dispatch({ type: POST_IDEA, payload: data });
      return data;
    });
  } catch (error) {
    console.log(error);
  }
};
export const editIdeas = (params, id) => (dispatch) => {
  try {
    return IdeaService.editIdeas(params, id).then((data) => {
      dispatch({ type: EDIT_IDEA, payload: data });
      return data;
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteIdeas = (params) => (dispatch) => {
  try {
    return IdeaService.deleteIdea(params).then((data) => {
      dispatch({ type: DELETE_IDEA, payload: data });
      return data;
    });
  } catch (error) {
    console.log(error);
  }
};
export const getContactMe = (name, email, message, idea_id) => (dispatch) => {
  return contactMeService
    .contactme(name, email, message, idea_id)
    .then((contactInfo) => {
      dispatch({ type: CONTACT_ME, payload: contactInfo });

      return contactInfo;
    });
};
