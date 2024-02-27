import logo from "../logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// firebase
import { auth, db } from "../firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
// import { collection } from "firebase/firestore";

export default function Register({ email, setEmail, username, setUsername, password, setPassword, usersCollectionRef }) {
	const [showRegisterError, isShowRegisterError] = useState(false);
	const navigate = useNavigate();

	const createUser = async () => {
		try {
			// create new Firebase User
			await createUserWithEmailAndPassword(auth, email, password);
			// store user
			await setDoc(doc(usersCollectionRef, auth.currentUser.uid), {
				bio: "",
				email: email,
				gender: "",
				username: username,
			});
			console.log("register:", auth?.currentUser?.email);
			navigate("/");
		} catch (err) {
			isShowRegisterError(true);
			console.error(err);
		}
	};

	return <>
		{/* Template: https://mdbootstrap.com/docs/standard/extended/register/#section-8 */}
		<div className="container">
			<div className="row gx-lg-5 align-items-center">

				<div className="col-lg-7 form-greeting px-5">
					<h4 className="ls-tight text-light">
						Organize your thoughts with
						<div>
							<img src={logo} alt="BEELINE logo" width="40" className="d-inline-block align-text-top" style={{ marginTop: "-11px", marginRight: "6px" }} />
							<span className="app-name text-warning" style={{ fontSize: "50px" }}>BEELINE</span>
						</div>
					</h4>
					<div>
						<div className="my-4"><i>Buzzing with ideas?</i></div>
						<div>Organize your thoughts with our app. Jot down notes, create cohesive diagrams <span className="text-secondary">(coming soon!)</span>, and make a hive of trusted collaborators to brainstorm with.</div>
					</div>
				</div>

				<div className="col-lg-4">
					<div className="card bg-dark border border-warning border-body text-warning">
						<div className="card-body pb-5 px-md-5">
							<h4 className="pt-3 pb-4 ls-tight fw-bold text-warning">Register your account.</h4>

							{showRegisterError && <div className="alert alert-warning align-items-center">
								<div>This email already has an account.</div>
								<div>Do you want to register?</div>
							</div>}

							<form>
								<div className="input-group">
									<span className="input-group-text bg-dark" style={{ width: "50px", fontSize: "24px" }} id="usernameLabel"><i className="fa fa-solid fa-user text-warning" style={{ marginLeft: "6px" }}></i></span>
									<input type="text" className="form-control" placeholder="Username" id="username" htmlFor="username" name="username" onChange={(e) => setUsername(e.target.value)} value={username} />
								</div>

								<div className="input-group">
									<span className="input-group-text bg-dark" style={{ width: "50px", fontSize: "24px" }} id="newEmailLabel"><i className="fa fa-solid fa-envelope text-warning"></i></span>
									<input type="email" className="form-control" placeholder="Email" id="email" htmlFor="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
								</div>

								<div className="input-group">
									<span className="input-group-text bg-dark" style={{ width: "50px", fontSize: "24px" }} id="passwordLabel"><i className="fa fa-solid fa-lock text-warning" style={{ marginLeft: "4px" }}></i></span>
									<input type="password" className="form-control" placeholder="Password" id="password" htmlFor="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
								</div>

								<button type="button" className="btn btn-warning btn-block mb-4" onClick={createUser}>
									REGISTER
								</button>
							</form>
						</div>
					</div>
				</div>

			</div>
		</div>
	</>;
}