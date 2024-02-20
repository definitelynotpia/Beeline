import './App.css';
import logo from './logo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route, NavLink } from 'react-router-dom';

// components
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';

function App() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const accounts = [
    { email: "harry.styles@school.edu.com", password: "asitwas" },
    { email: "taylor.swift@school.edu.com", password: "cruelsummer1989" },
    { email: "lana.delrey@school.edu.com", password: "summertimesadness" },
  ];

  const logout = () => {
    setEmail("");
    navigate("/login");
  };

  let isLogin, isProfile = false;

  // if user not logged in, render login button
  if (email == "") {
    isProfile = false;
    isLogin = true;
  } else {
    // if user logged in, render profile button
    isLogin = false;
    isProfile = true;
  }

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">

          <img src={logo} alt="BEELINE logo" width="50" className="d-inline-block align-text-top app-icon" />
          <NavLink className="navbar-brand text-warning app-name" to="/">BEELINE</NavLink>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" to="/">Dashboard</NavLink>
              </li>
            </ul>

            {isLogin && <><button className="btn btn-outline-warning ms-5 me-3" id="loginButton" type="button">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </button>
              <button className="btn btn-warning" id="registerButton" type="button">
                <NavLink className="nav-link" to="/register">Register</NavLink>
              </button></>}

            {isProfile && <><button type="button" className="btn btn-outline-warning ms-5 me-3"><NavLink className="nav-link" to="/profile" ><i className="fa fa-user" style={{ fontSize: '21px' }}></i></NavLink></button>
              <button className="btn btn-warning" id="loginButton" type="button" onClick={logout}>Logout</button></>}
          </div>
        </div>
      </nav>

      {/* Webpage content */}
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/login" element={<Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} loginCredentials={accounts} />} />

          <Route path="/register" element={<Register email={email} setEmail={setEmail} username={username} setUsername={setUsername} password={password} setPassword={setPassword} registerCredentials={accounts} />} />

          <Route path="/profile" element={<Profile username={username} email={email} />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
