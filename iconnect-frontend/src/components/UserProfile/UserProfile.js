import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import userImage from "../../assets/images/user.png";
import "./UserProfile.css";

const UserProfile = () => {
  const user = useSelector(state => state.authReducer.user);

  return (
    <>
      {user ? (
        <div className="div-card">
          <div className="user-info-card">
            <div>
              <img className="user-image" src={userImage} alt="" />
            </div>
            <div>
              <div>
                <h5>
                  <span className="field-name">Name: </span>
                  {user && user.firstName && user.lastName
                    ? user.firstName + " " + user.lastName
                    : ""}
                </h5>
                <h6>
                  <span className="field-name">Email: </span>
                  {user && user.email ? user.email : ""}
                </h6>
                <h6>
                  <span className="field-name">Company Name: </span>
                  {user && user.companyName
                    ? user.companyName
                    : "No Company Mentioned"}
                </h6>
                <h6>
                  <span className="field-name">User Role: </span>
                  {user && user.role
                    ? user.role.toUpperCase()
                    : "No Role Mentioned"}
                </h6>
              </div>
              <div className="div-button">
                <button className="btn #fafafa blue lighten-2 profile-edit-button">
                  <Link to={"/editprofile"}>Edit Profile</Link>
                </button>
              </div>
            </div>
          </div>
          {/* <div className="idea-card">
            <h3 className="user-postings-heading">Ideas</h3>
            <Typography
              gutterBottom
              variant="h4"
              align="center"
              className={classes.text}
            >
              No Ideas Posted
            </Typography>{" "}
          </div>
          <div className="funding-card">
            <h3 className="user-postings-heading">Funding</h3>
            <h5>No Projects Funded</h5>
          </div> */}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default UserProfile;
