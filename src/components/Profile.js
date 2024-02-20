import logo from '../logo.png';

export default function Profile({ username, email }) {
	return <>
		<div className="container py-5 h-100">
			<div className="row d-flex justify-content-center align-items-center h-100">
				<div className="col col-lg-6 mb-4 mb-lg-0">
					<div className="card mb-3" style={{ borderRadius: '.5rem' }}>
						<div className="row g-0">
							<div className="col-md-4 bg-dark text-center text-white"
								>
								<img src={logo} alt="Avatar" className="img-fluid my-5" width='80px' />
								<h5>{username}</h5>
								<p>{email}</p>
								<i className="fa fa-edit mb-5"></i>
							</div>
							<div className="col-md-8">
								<div className="card-body p-4">
									<h6>Information</h6>
									<hr className="mt-0 mb-4" />
									<div className="row pt-1">
										<div className="col-6 mb-3">
											<h6>Email</h6>
											<p className="text-muted">info@example.com</p>
										</div>
										<div className="col-6 mb-3">
											<h6>Phone</h6>
											<p className="text-muted">123 456 789</p>
										</div>
									</div>
									<h6>Projects</h6>
									<hr className="mt-0 mb-4" />
									<div className="row pt-1">
										<div className="col-6 mb-3">
											<h6>Recent</h6>
											<p className="text-muted">Lorem ipsum</p>
										</div>
										<div className="col-6 mb-3">
											<h6>Most Viewed</h6>
											<p className="text-muted">Dolor sit amet</p>
										</div>
									</div>
									<div className="d-flex justify-content-start">
										<a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
										<a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
										<a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>;
}