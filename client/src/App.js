import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import University from './pages/University';
import Course from './pages/Course';
import Navbar from './components/Navbar.js'
import Registration from './pages/Registration';
import Login from './pages/Login';
import {AuthContext} from './helpers/AuthContext.js';
import { useState, useEffect } from "react"; 
import axios from "axios";

function App() {

    const [authState, setAuthState] = useState();
    const [username, setUsername] = useState();
    const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {

        axios.get("http://localhost:3001/user/auth", {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }).then ((response) => {
          console.log("ELLO " + response.data.username);
          if (response.data) {
            console.log(response.data)
            setAuthState(true);
            setUsername(response.data.username);
            (console.log("ERRORRRRR"))
          } else {
            setAuthState(false);
            setUsername();
            console.log("NO ERRORRRR")
          }
          setLoading(false);
          
        });
        });

        if (isLoading) {
          return <div className="App"></div>
        }

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <Navbar username={username} authState={authState} setAuthState={setAuthState}/>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/:universityTag" exact element={<University />} />
          <Route path="/:universityTag/:facultyName/:courseID" exact element={<Course username={username}/>} />
          <Route path="/register" exact element={<Registration />} /> 
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
