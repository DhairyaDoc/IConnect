import UserService from "../../services/userService";
import { REGISTER } from "../type";

export const updateUser = params => dispatch => {
  const userID = params.userID;
  const updatedUser = {
    firstName: params.firstName,
    lastName: params.lastName,
    email: params.email,
    companyName: params.companyName,
    role: params.userRole,
    isPremiumMember: params.isPremiumMember,
    premiumMembershipType: params.premiumMembershipType,
  };

  return UserService.updateUser(updatedUser, userID).then(userDetails => {
    localStorage.setItem("user", JSON.stringify(userDetails.user));
    dispatch({
      type: REGISTER,
      payload: { data: userDetails.user, token: localStorage.getItem("token") },
    });
    return userDetails;
  });
};
