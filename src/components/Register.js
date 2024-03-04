import logo from "../logo.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// firebase
import { auth, db } from "../firebase/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export default function Register({ email, setEmail, username, setUsername, password, setPassword, usersCollectionRef }) {

	const [confirmPassword, setConfirmPassword] = useState("");
	const [userExists, isUserExists] = useState(false);
	const [showRegisterError, isShowRegisterError] = useState(false);
	const navigate = useNavigate();

	const createUser = async () => {
		try {
			// create new Firebase User (displayName/username, email, password)
			await createUserWithEmailAndPassword(auth, email, password);
			updateProfile(auth.currentUser, {
				displayName: username,
				photoURL: "https://example.com/jane-q-user/profile.jpg"
			})
			// store user in Firestore db
			await setDoc(doc(usersCollectionRef, auth.currentUser.uid), {
				bio: "",
				email: email,
				gender: "",
				username: username,
			});
			console.log("register:", auth?.currentUser?.email);
			navigate("/");
		} catch (err) {
			isUserExists(true);
			isShowRegisterError(true);
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

							{showRegisterError && <>
								{(email == "" || password == "" || username == "" || confirmPassword == "") && <div className="alert alert-warning align-items-center" style={{ fontSize: "15px" }}><div className="fw-bold" style={{ fontSize: "16px" }}>Missing fields.</div>One or more required fields are empty. Please check your input.</div>}
								{userExists && <div className="alert alert-warning align-items-center" style={{ fontSize: "15px" }}><div className="fw-bold" style={{ fontSize: "16px" }}>Email already in use.</div>Please use a unique email when registering.</div>}
							</>}

							<form>
								<div className="input-group">
									<span className="input-group-text bg-dark" style={{ width: "50px", fontSize: "24px" }} id="usernameLabel"><i className="fa fa-solid fa-user text-warning" style={{ marginLeft: "3px" }}></i></span>
									<input type="text" className="form-control" placeholder="Username" id="username" htmlFor="username" name="username" onChange={(e) => setUsername(e.target.value)} value={username} required />
								</div>

								<div className="input-group">
									<span className="input-group-text bg-dark" style={{ width: "50px", fontSize: "24px" }} id="newEmailLabel"><i className="fa fa-solid fa-envelope text-warning"></i></span>
									<input type="email" className="form-control" placeholder="Email" id="email" htmlFor="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
								</div>

								<div className="input-group">
									<span className="input-group-text bg-dark" style={{ width: "50px", fontSize: "24px" }} id="passwordLabel"><i className="fa fa-solid fa-lock text-warning" style={{ marginLeft: "4px" }}></i></span>
									<input type="password" className="form-control" placeholder="Password" id="password" htmlFor="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
								</div>

								<div className="input-group">
									<span className="input-group-text bg-dark" style={{ width: "50px", fontSize: "24px" }} id="confirmPasswordLabel"><i className="fa fa-solid fa-unlock text-warning" style={{ marginLeft: "1px" }}></i></span>
									<input type="password" className="form-control" placeholder="Confirm password" id="confirmPassword" htmlFor="confirmPassword" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required />
								</div>

								{/* No password entered */
									password == "" && <button type="button" className="btn btn-warning btn-block mb-4" onClick={createUser}>
										REGISTER
									</button>}

								{/* No password entered */
									(password != "" && password == confirmPassword) && <>
										<div className="mb-4 fw-bold text-left text-success" style={{ fontSize: "16px" }}><i className="fa fa-solid fa-check" style={{ marginLeft: "1px", marginRight: "6px" }}></i>Passwords match.</div>
										<button type="button" className="btn btn-warning btn-block mb-4" onClick={createUser}>
											REGISTER
										</button>
									</>}

								{/* Password mismatch */
									(password != "" && password != confirmPassword) && <>
										<div className="alert alert-warning align-items-center mb-4">Passwords do not match.</div>
										<button type="button" className="btn btn-warning btn-block mb-4" onClick={createUser} disabled>
											REGISTER
										</button>
									</>}

							</form>
						</div>
					</div>
				</div>

			</div>
		</div >
	</>;
}