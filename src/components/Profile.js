import logo from '../logo.png';

export default function Profile({ username, email }) {
	return <>
		{/* Template: https://mdbootstrap.com/docs/standard/extended/profiles/#section-3 */}
		<div class="container py-5">
			<div class="row">
				<div class="col-lg-4">
					<div class="card mb-4 bg-dark">
						<div class="card-body text-center">
							<img src={logo} alt="avatar"
								class="img-fluid" width="150px" />
							<h5 class="my-3">{username}</h5>
							<p class="text-muted mb-1">{email}</p>
						</div>
					</div>
				</div>
				<div class="col-lg-8">
					<div class="card mb-4">
						<div class="card-body">
							<div class="row">
								<div class="col-sm-3">
									<p class="mb-0">Full Name</p>
								</div>
								<div class="col-sm-9">
									<p class="text-muted mb-0">Johnatan Smith</p>
								</div>
							</div>
							<hr />
							<div class="row">
								<div class="col-sm-3">
									<p class="mb-0">Email</p>
								</div>
								<div class="col-sm-9">
									<p class="text-muted mb-0">{email}</p>
								</div>
							</div>
							<hr />
							<div class="row">
								<div class="col-sm-3">
									<p class="mb-0">Phone</p>
								</div>
								<div class="col-sm-9">
									<p class="text-muted mb-0">(097) 234-5678</p>
								</div>
							</div>
							<hr />
							<div class="row">
								<div class="col-sm-3">
									<p class="mb-0">Mobile</p>
								</div>
								<div class="col-sm-9">
									<p class="text-muted mb-0">(098) 765-4321</p>
								</div>
							</div>
							<hr />
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="card mb-4 mb-md-0">
								<div class="card-body">
								</div>
							</div>
						</div>

						<div class="col-md-6">
							<div class="card mb-4 mb-md-0">
								<div class="card-body">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>;
}