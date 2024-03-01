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
import { db, auth } from "./firebase/Firebase";
import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";


function App() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  // if not logged in, userData will be null
  const user = auth.userData;
  const usersCollectionRef = collection(db, "Users");

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     // store data from Users collection into users
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getUsers();
  // }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setEmail("");
      setPassword("");
      setUsername("");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
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

            { // if user is not logged in
              !user && <><button className="btn btn-outline-warning ms-5 me-3" id="loginButton" type="button">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </button>
                <button className="btn btn-warning" id="registerButton" type="button">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </button></>}

            { // if user is logged in
              user && <><button type="button" className="btn btn-outline-warning ms-5 me-3"><NavLink className="nav-link" to="/profile" ><i className="fa fa-user" style={{ fontSize: "21px" }}></i></NavLink></button>
                <button className="btn btn-warning" id="loginButton" type="button" onClick={logout}>Logout</button></>}
          </div>
        </div>
      </nav>

      <header className="App-header">
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/login" element={<Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} />} />

          <Route path="/register" element={<Register email={email} setEmail={setEmail} username={username} setUsername={setUsername} password={password} setPassword={setPassword} usersCollectionRef={usersCollectionRef} />} />

          <Route path="/profile" element={<Profile usersCollectionRef={usersCollectionRef} userData={userData} setUserData={setUserData} />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
