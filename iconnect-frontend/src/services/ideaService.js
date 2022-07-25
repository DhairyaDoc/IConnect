import { Backend_URL } from "../config/app";

const IdeaService = {
  ideas: () => {
    const token = localStorage.getItem("token");
    return fetch(Backend_URL + "ideas", {
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

  getUserIdeas: (params) => {
    const token = localStorage.getItem("token");
    return fetch(Backend_URL + `userIdeas/${params.userID}`, {
      method: "GET",
      headers: {
        Authorization: "bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((ideas) => {
        return ideas;
      });
  },
  postIdeas: (data) => {
    const token = localStorage.getItem("token");
    return fetch(Backend_URL + `postIdea`, {
      method: "POST",
      headers: {
        Authorization: "bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    })
      .then((res) => res.json())
      .then((ideas) => {
        return ideas;
      });
  },
  editIdeas: (data, id) => {
    const token = localStorage.getItem("token");

    return fetch(Backend_URL + `updateIdea/${id}`, {
      method: "POST",
      headers: {
        Authorization: "bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    })
      .then((res) => res.json())
      .then((ideas) => {
        return ideas;
      });
  },
  deleteIdea: (id) => {
    const token = localStorage.getItem("token");

    return fetch(Backend_URL + `deleteIdea/${id}`, {
      method: "GET",
      headers: {
        Authorization: "bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((ideas) => {
        return ideas;
      });
  },
};

const searchIdeaService = {
  searchideas: (searchQuery) => {
    const token = localStorage.getItem("token");

    return fetch(Backend_URL + "searchidea?searchQuery=" + searchQuery.search, {
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
};

const contactMeService = {
  contactme: (name, email, message, idea_id) => {
    const token = localStorage.getItem("token");

    return fetch(
      Backend_URL +
        "contactform?name=" +
        name +
        "&email=" +
        email +
        "&message=" +
        message +
        "&ideaId=" +
        idea_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },
};

export { IdeaService, searchIdeaService, contactMeService };
