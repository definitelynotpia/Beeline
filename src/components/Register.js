import logo from "../logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// firebase
import { db } from "../firebase/Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function Register({ newEmail, setNewEmail, newUsername, setNewUsername, newPassword, setNewPassword }) {
	const [showRegisterError, isShowRegisterError] = useState(false);
	const usersCollectionRef = collection(db, "Users");
	const navigate = useNavigate();

	const createUser = async () => {
		await addDoc(usersCollectionRef,
			{
				bio: "",
				email: newEmail,
				gender: "",
				password: newPassword,
				newUsername: newUsername,
			}
		);

		navigate("/");
	};


	// const validateRegister = () => {
	// 	// get register credentials
	// 	const arrayIndex = registerCredentials.findIndex((obj) => newEmail === obj.newEmail);
	// 	var isValidEmail = registerCredentials[arrayIndex].newEmail === newEmail;
	// 	var isValidPassword = registerCredentials[arrayIndex].newPassword === newPassword;
	// 	console.log(isValidEmail);
	// 	console.log(isValidPassword);

	// 	if (isValidEmail) {
	// 		if (isValidPassword) {
	// 			navigate("/");
	// 		}
	// 		isShowRegisterError(true);
	// 	} else {
	// 		isShowRegisterError(true);
	// 	}
	// };

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
					<p>
						<div className="my-4"><i>Buzzing with ideas?</i></div>
						<div>Organize your thoughts with our app. Jot down notes, create cohesive diagrams <span className="text-secondary">(coming soon!)</span>, and make a hive of trusted collaborators to brainstorm with.</div>
					</p>
				</div>

				<div className="col-lg-4">
					<div className="card bg-dark border border-warning border-body text-warning">
						<div className="card-body pb-5 px-md-5">
							<h4 className="pt-3 pb-4 ls-tight fw-bold text-warning">Register your account.</h4>

							{showRegisterError && <div className="alert alert-warning align-items-center">
								<div>This newEmail already has an account.</div>
								<div>Do you want to register?</div>
							</div>}

							<form>
								<div class="input-group">
									<span class="input-group-text bg-dark" style={{ width: "50px", fontSize: "24px" }} id="newUsernameLabel"><i class="fa fa-solid fa-user text-warning"></i></span>
									<input type="text" class="form-control" placeholder="Username" id="newUsername" htmlFor="newUsername" name="newUsername" onChange={(e) => setNewUsername(e.target.value)} value={newUsername} />
								</div>

								<div class="input-group">
									<span class="input-group-text bg-dark" style={{ width: "50px", fontSize: "24px" }} id="newEmailLabel"><i class="fa fa-solid fa-envelope text-warning"></i></span>
									<input type="email" class="form-control" placeholder="Email" id="newEmail" htmlFor="newEmail" name="newEmail" onChange={(e) => setNewEmail(e.target.value)} value={newEmail} />
								</div>

								<div class="input-group">
									<span class="input-group-text bg-dark" style={{ width: "50px", fontSize: "24px" }} id="newPasswordLabel"><i class="fa fa-solid fa-lock text-warning" style={{ marginLeft: "4px" }}></i></span>
									<input type="password" class="form-control" placeholder="Password" id="newPassword" htmlFor="newPassword" name="newPassword" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
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