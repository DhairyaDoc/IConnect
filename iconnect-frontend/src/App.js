import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import InvestmentModal from "./components/Ideas/Idea/InvestmentIdeaDetails";
import RecievedInvestments from "./components/ReceivedInvestments/ReceivedInvestments";
import Dashboard from "./components/Dashboard/Dashboard";
import Ideas from "./components/Ideas/Ideas";
import PageNotFound from "./components/PageNotFound/PageNotfound";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { isTokenValid, logout } from "./store/actions/auth";
import { Provider } from "react-redux";
import store from "../src/store";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import UserProfile from "./components/UserProfile/UserProfile";
import PostIdea from "./components/PostIdea/PostIdea";
import { drawerWidth } from "./config/app";
import { Box, CssBaseline } from "@mui/material";
import MyIdeas from "./components/MyIdeas/MyIdeas";
import EditUserProfile from "./components/EditUserProfile/EditUserProfile";
import SideBar from "./components/SideBar/SideBar";
import MyInvestments from "./components/MyInvestments/MyInvestments";
import MyPendingInvestment from "./components/PendingInvestments/MyPendingInvestment";
import InvestmentRequest from "./components/InvestmentRequest/InvestmentRequest";
import InvestmentPayment from "./components/InvestmentPayment/InvestmentPayment";

const Routing = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (token && user) {
      dispatch(isTokenValid());
    }
  });

  useEffect(() => {
    if (isLoggedIn === false) {
      dispatch(logout());
    }
  }, [isLoggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  const routes = () => {
    return (
      <>
        <Routes>
          <Route
            path="/"
            element={
              token && user ? (
                <Navigate replace to="/ideas" />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />

          <Route
            path="/login"
            element={
              token && user ? <Navigate replace to="/ideas" /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              token && user ? <Navigate replace to="/ideas" /> : <Register />
            }
          />
          <Route
            path="/forgotpassword"
            element={
              token && user ? (
                <Navigate replace to="/ideas" />
              ) : (
                <ForgotPassword />
              )
            }
          />
          <Route path="/myideas" element={<MyIdeas />} />

          <Route path="/editprofile" element={<EditUserProfile />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/postIdea" element={<PostIdea />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/editprofile" element={<EditUserProfile />} />
          <Route
            path="/investmentideadetails/:id"
            element={<InvestmentModal />}
          />
          <Route path="/myinvestments" element={<MyInvestments />} />
          <Route
            path="/mypendinginvestments"
            element={<MyPendingInvestment />}
          />
          <Route path="/investmentrequest" element={<InvestmentRequest />} />
          <Route
            path="/receivedInvestments"
            element={<RecievedInvestments />}
          />
          <Route path="/investmentpayment" element={<InvestmentPayment />} />

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </>
    );
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      {token && user ? (
        <>
          <SideBar />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <div className="top">{routes()}</div>
          </Box>
        </>
      ) : (
        <div className="top center">{routes()}</div>
      )}
    </Box>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
