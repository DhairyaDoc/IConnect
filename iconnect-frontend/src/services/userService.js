import { Backend_URL } from "../config/app";

const UserService = {
  updateUser: (data, userID) => {
    const token = localStorage.getItem("token");
    return fetch(Backend_URL + `update/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        return data;
      });
  },
};

export default UserService;
