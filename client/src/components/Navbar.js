import React, {useState, useContext, useEffect} from 'react'
import Login from '../pages/Login';
import Registration from '../pages/Registration';

import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';




function Navbar(props) {
console.log(props.authState);

//  const {authState, setAuthState} = useState(AuthContext);
 // console.log(props.authState)
  const logout = () => {
    console.log("HELLO");
    sessionStorage.removeItem("accessToken");
    props.setAuthState(false);
    
  }
  return (
    <div className="navbar">
      <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
        <div className="name">
            Course Reviews
        </div>
      </Link>
        <div className="reviewTopR">
          
          {!props.authState ? (
          <>
          <Link to="/login" style={{ textDecoration: 'none' }}><Button>Log In</Button></Link>
          <Link to="/register" style={{ textDecoration: 'none' }}><Button>Register</Button></Link>
          </>
          ) : (
            <>
            {props.username}
            <Button onClick={logout}>Log Out</Button>
            </>
          )}
        </div>
    </div>
  )
}

export default Navbar