import { useState } from "react";
import { useNavigate } from "react-router-dom";
// firebase
import { auth } from "../firebase/Firebase"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";


export default function Login({ email, setEmail, password, setPassword, setUid }) {
	const [showLoginError, isShowLoginError] = useState(false);
	const navigate = useNavigate();
	const googleProvider = new GoogleAuthProvider();

	const signIn = async () => {
		await setPersistence(auth, browserLocalPersistence)
			.then(() => {
				signInWithEmailAndPassword(auth, email, password);
				setUid(auth.currentUser.uid);
				navigate("/profile");
			})
			.catch((error) => {
				isShowLoginError(true);
				console.error(error);
			});
	};

	// sign in with google
	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
			console.log("google signin:", auth?.currentUser?.email);
			navigate("/");
		} catch (error) {
			isShowLoginError(true);
			console.error(error)
		}
	};

	return <>
		{/* Template: https://mdbootstrap.com/docs/standard/extended/login/#section-8 */}
		<div className="container">
			<div className="row gx-lg-5 align-items-center">

				<div className="col-lg-7 form-greeting px-5">
					<h2 className="ls-tight text-light">
						Welcome back,<br />
						<span className="fw-bold text-warning display-5">busy bee!</span>
					</h2>
					<div>
						<div className="mt-4 mb-3"><i>Loving our app?</i></div>
						<div>Help <span className="app-name text-warning" style={{ fontSize: "32px" }}>BEELINE</span> grow and improve by inviting your friends to join, and sending feedback to our support department.</div>
					</div>
				</div>

				<div className="col-lg-4">
					<div className="card bg-dark border border-warning border-body text-warning">
						<div className="card-body pb-5 px-md-4">
							<h3 className="pt-3 pb-4 ls-tight fw-bold text-warning">Login to your account.</h3>

							{showLoginError && <div className="alert alert-warning align-items-center">
								<div>Invalid email or password.</div>
								<div>Please try again.</div>
							</div>}

							<form>
								<div className="input-group">
									<span className="input-group-text bg-dark" style={{ width: "50px", fontSize: "24px" }} id="emailLabel"><i className="fa fa-solid fa-envelope text-warning"></i></span>
									<input type="email" className="form-control" placeholder="Email" id="email" htmlFor="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} style={{ fontSize: "20px" }} required />
								</div>

								<div className="input-group">
									<span className="input-group-text bg-dark" style={{ width: "50px", fontSize: "24px" }} id="passwordLabel"><i className="fa fa-solid fa-lock text-warning" style={{ marginLeft: "4px" }}></i></span>
									<input type="password" className="form-control" placeholder="Password" id="password" htmlFor="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} style={{ fontSize: "20px" }} required />
								</div>

								{/* <div className="mb-4" style={{ fontSize: "18px" }}>
									<span className="me-2" style={{ width: "50px" }} id="rememberMe">
										<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={toggleAuthPersistence} />
									</span>Remember me
								</div> */}

								<button type="button" className="btn btn-warning btn-block fw-bold" onClick={signIn}>
									LOGIN
								</button>

								<hr className="my-4" />

								<p className="pb-2 ls-tight text-warning" style={{ fontSize: "18px" }}>Or login with connected apps:</p>

								<div className="d-flex flex-row justify-content-center align-items-center">
									<button type="button" className="btn btn-warning btn-block" onClick={signInWithGoogle}>
										<i className="fa fa-google"></i>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>

			</div>
		</div >
	</>;
}