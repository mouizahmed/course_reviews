import React, { useState, useContext, useEffect } from "react";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Navbar(props) {
  //  const {authState, setAuthState} = useState(AuthContext);
  // console.log(props.authState)
  const logout = () => {
    sessionStorage.removeItem("accessToken");
    props.setAuthState(false);
  };
  return (
    <div className="navbar">
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        <div className="name">
          <Typography
            sx={{ fontWeight: "bold", fontSize: 20, textAlign: "left" }}
          >
            Course Reviews
          </Typography>
        </div>
      </Link>
      <div className="reviewTopR">
        {!props.authState ? (
          <>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button>Log In</Button>
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button>Register</Button>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/profile"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Button>{props.username}</Button>
            </Link>
            <Button onClick={logout}>Log Out</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
