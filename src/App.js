// components
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
// react
import "./App.css";
import logo from "./logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, NavLink } from "react-router-dom";
// firebase
import { db } from "./firebase/Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";


function App() {
  // login
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // register
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "Users");

  const createUser = async () => {
    await addDoc(usersCollectionRef,
      {
        bio: "",
        email: newEmail,
        gender: "",
        password: newPassword,
        username: newUsername,
      }
    );
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getUsers();
  }, []);

  const accounts = [
    { username: "harrystyles", email: "harry.styles@school.edu.com", password: "asitwas" },
    { username: "taylorswift", email: "taylor.swift@school.edu.com", password: "cruelsummer1989" },
    { username: "honeymoon", email: "lana.delrey@school.edu.com", password: "summertimesadness" },
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
    // <>
    //   <div className="App">
    //     {users.map((User) => {
    //       return <div>
    //         <hr/>
    //         <div><hi>Username: {User.username}</hi></div>
    //         <div><hi>Email: {User.email}</hi></div>
    //         <div><hi>Gender: {User.gender}</hi></div>
    //         <div><hi>Pronouns: {User.pronouns}</hi></div>
    //         <div><hi>Bio: {User.bio}</hi></div>
    //       </div>
    //     })}
    //   </div>
    // </>
    <div className="App">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg fixed-top bg-dark border-bottom border-body" data-bs-theme="dark">
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

            {isProfile && <><button type="button" className="btn btn-outline-warning ms-5 me-3"><NavLink className="nav-link" to="/profile" ><i className="fa fa-user" style={{ fontSize: "21px" }}></i></NavLink></button>
              <button className="btn btn-warning" id="loginButton" type="button" onClick={logout}>Logout</button></>}
          </div>
        </div>
      </nav>

      {/* Webpage content */}
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/login" element={<Login email={email} setEmail={setEmail} setUsername={setUsername} password={password} setPassword={setPassword} loginCredentials={accounts} />} />

          <Route path="/register" element={<Register newEmail={newEmail} setNewEmail={setNewEmail} newUsername={newUsername} setNewUsername={setNewUsername} newPassword={newPassword} setNewPassword={setNewPassword} />} />

          <Route path="/profile" element={<Profile username={username} email={email} />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
