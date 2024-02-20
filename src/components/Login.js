import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login({ email, setEmail, password, setPassword, loginCredentials }) {
	const [showLoginError, isShowLoginError] = useState(false);
	const navigate = useNavigate();

	const validateLogin = () => {
		// get login credentials
		const arrayIndex = loginCredentials.findIndex((obj) => email === obj.email);
		var isValidEmail = loginCredentials[arrayIndex].email === email;
		var isValidPassword = loginCredentials[arrayIndex].password === password;
		console.log(isValidEmail);
		console.log(isValidPassword);

		if (isValidEmail) {
			if (isValidPassword) {
				navigate('/');
			}
			isShowLoginError(true);
		} else {
			isShowLoginError(true);
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
						<div>Help <span className="app-name text-warning" style={{ fontSize: '32px' }}>BEELINE</span> grow and improve by inviting your friends to join, and sending feedback to our support department.</div>
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
								<div class="input-group">
									<span class="input-group-text bg-dark" style={{ width: '50px', fontSize: '24px' }} id="emailLabel"><i class="fa fa-solid fa-envelope text-warning"></i></span>
									<input type="email" class="form-control" placeholder="Email" id="email" htmlFor="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} style={{ fontSize: '20px' }} />
								</div>

								<div class="input-group">
									<span class="input-group-text bg-dark" style={{ width: '50px', fontSize: '24px' }} id="passwordLabel"><i class="fa fa-solid fa-lock text-warning" style={{ marginLeft: '4px' }}></i></span>
									<input type="password" class="form-control" placeholder="Password" id="password" htmlFor="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} style={{ fontSize: '20px' }} />
								</div>

								<div class="mb-4" style={{ fontSize: '18px' }}>
									<span className="me-2" style={{ width: '50px' }} id="rememberMe">
										<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
									</span>Remember me
								</div>

								<button type="button" className="btn btn-warning btn-block" onClick={validateLogin}>
									LOGIN
								</button>
							</form>
						</div>
					</div>
				</div>

			</div>
		</div >
	</>;
}