import React from "react";
import "./PageNotFound.css";
import { Button } from "@mui/material";
import image404 from "../../assets/images/kostiantyn-li-Fi_nhg5itCw-unsplash.jpg";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page-not-found ">
      <img src={image404} alt="" className="image404 rotate" />
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/");
        }}
      >
        Take me Home
      </Button>
    </div>
  );
};

export default PageNotFound;
