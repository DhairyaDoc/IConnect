import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppBar } from "@mui/material";
import "./Navbar.css";
import { LOGOUT } from "../../store/type";
import { drawerWidth } from "../../config/app";
import { Box } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import { TextField } from "@material-ui/core";
import { getIdeasBySearch, ideas } from "../../store/actions/idea";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

  const logout = () => {
    localStorage.clear();
    dispatch({ type: LOGOUT });
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (search.trim()) {
      dispatch(getIdeasBySearch({ search }));
    } else {
      navigate("/");
    }
  };

  const handleShowAllIdeas = (e) => {
    dispatch(ideas());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: isLoggedIn ? `calc(100% - ${drawerWidth}px)` : null,
          ml: `${drawerWidth}px`,
        }}
      >
        {isLoggedIn ? (
          <AppBar position="static">
            <ul
              id="nav-mobile"
              className="right"
              style={{ margin: "10px 30px 10px 30px" }}
            >
              <li>
                <button
                  className="btn #0d47a1 blue darken-4 right"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </li>

              <li>
                <button
                  className="btn #0d47a1 blue darken-4 right"
                  onClick={() => handleShowAllIdeas()}
                >
                  Show all ideas
                </button>
              </li>

              <li>
                <button
                  className="btn #0d47a1 blue darken-4 right"
                  onClick={() => handleSearch()}
                >
                  Search
                </button>
              </li>

              <li>
                <TextField
                  className="right"
                  style={{ margin: "0px 10px" }}
                  name="search"
                  variant="outlined"
                  label="Search Ideas"
                  width="100px"
                  value={search}
                  InputProps={{ disableunderline: "true" }}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </li>
            </ul>
          </AppBar>
        ) : (
          <nav>
            <div className="nav-wrapper blue navbar">
              <Link
                to={isLoggedIn ? "/ideas" : "/login"}
                className="brand-logo left"
              >
                IConnect
              </Link>
              <ul id="nav-mobile" className="right">
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/register"}>Register</Link>
                </li>
              </ul>
            </div>
          </nav>
        )}
      </AppBar>
    </Box>
  );
};

export default NavBar;
