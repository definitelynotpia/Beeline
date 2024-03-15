// components
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Notes from "./sidebar/Notes";
import Tags from "./sidebar/Tags";
import Beehives from "./sidebar/Beehives";
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
  const navigate = useNavigate();
  // if not logged in, userData will be null
  const user = auth.currentUser;
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
      <nav className="navbar navbar-expand-lg sticky-top bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">

          <img src={logo} alt="BEELINE logo" width="50" className="d-inline-block align-text-top app-icon" />
          <NavLink className="navbar-brand text-warning app-name" to="/">BEELINE</NavLink>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">

            { // if user is not logged in
              (!user && <><button className="btn btn-outline-warning ms-5 me-3" id="loginButton" type="button">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </button>
                <button className="btn btn-warning me-2" id="registerButton" type="button">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </button></>) || // if user is logged in
              (<><button type="button" className="btn btn-outline-warning ms-5 me-3"><NavLink className="nav-link" to="/profile" ><i className="fa fa-user" style={{ fontSize: "21px" }}></i></NavLink></button>
                <button className="btn btn-warning me-2" id="loginButton" type="button" onClick={logout}>Logout</button></>)}
          </div>
        </div>
      </nav>

      {/* sidebar */
        (user && <>
          {/* sidebar */}
          <div className="d-flex flex-column align-items-center position-fixed p-3 text-white bg-dark" style={{ width: "250px", height: "100vh" }}>
            {/* profile dropdown */}
            <div className="dropdown my-3">
              <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle mx-2" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={auth.currentUser.photoURL} alt="" width="32" height="32" className="rounded-circle me-2" />
                {auth.currentUser.displayName}
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                <NavLink className="dropdown-item" to="/profile" >Profile</NavLink>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Sign out</a></li>
              </ul>
            </div>

            {/* nav */}
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <NavLink className={window.location.pathname == "/" ? "nav-link my-2 fw-bold bg-warning text-dark" : "nav-link  my-2 bg-dark text-warning"} to="/">Notes</NavLink>
              </li>
              <li>
                <NavLink className={window.location.pathname == "/beehives" ? "nav-link my-2 fw-bold bg-warning text-dark" : "nav-link  my-2 bg-dark text-warning"} to="/beehives">Beehives</NavLink>
              </li>
              <li>
                <NavLink className={window.location.pathname == "/tags" ? "nav-link my-2 fw-bold bg-warning text-dark" : "nav-link  my-2 bg-dark text-warning"} to="/tags">Tags</NavLink>
              </li>
            </ul>
          </div>

          <header style={{ marginLeft: "250px" }}>
            <Routes>
              <Route path="/" element={<Notes />} />

              <Route path="/beehives" element={<Beehives />} />

              <Route path="/tags" element={<Tags />} />

              <Route path="/profile" element={<Profile />} />
            </Routes>
          </header>
        </>) ||
        (<><header className="App-header">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/login" element={<Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} />} />

            <Route path="/register" element={<Register email={email} setEmail={setEmail} username={username} setUsername={setUsername} password={password} setPassword={setPassword} usersCollectionRef={usersCollectionRef} />} />
          </Routes>
        </header></>)
      }
    </div >
  );
}

export default App;
