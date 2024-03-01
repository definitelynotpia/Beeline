import logo from "../logo.png";
// react
import { useEffect } from "react";
// firebase
import { db, auth } from "../firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";

export default function Profile({ usersCollectionRef, userData, setUserData }) {

	useEffect(() => {
		const fetchDocById = async () => {
			// Create DocumentReference
			const docRef = doc(db, "Users", auth.currentUser.uid) // db = getFirestore()
			// Fetch document
			getDoc(docRef)
				.then(docSnap => {
					if (docSnap.exists()) {
						setUserData(docSnap.data());
					}
				});
		};
		fetchDocById();
	}, [auth.currentUser.uid]);

	console.log();

	return <>

		<div className="container py-5">
			<div className="row">

				{/* profile info */}
				<div className="col col-lg-5 h-100">
					<div className="card border border-1 border-warning bg-dark text-white">
						<div className="justify-content-center align-items-center mt-5">
							<img src={logo} alt="Avatar" className="img-fluid img-thumbnail mb-3" width='150px' />
							<div className="text-white">
								<h3 className="text-warning fw-bold">{userData.username}</h3>
								<h5 className="text-light fw-normal opacity-75"><i>{userData.email}</i></h5>
							</div>
						</div>
						<hr className="my-4 text-warning" />

						<div className="row">
							<div className="col">
								<p className="mb-1 h5">(# total notes)</p>
								<p className="small text-light opacity-50">Contributions</p>
							</div>
							<div className="col">
								<p className="mb-1 h5">(# total groups)</p>
								<p className="small text-light opacity-50">Beehives</p>
							</div>
						</div>

						<hr className="my-4 text-warning" />
						{/* Bio */}
						<div className="px-4">
							<p className="text-start fw-bold fst-italic mb-2" style={{ fontSize: "20px" }}>Bio</p>
							<p className="text-start text-justify opacity-75" style={{ fontSize: "18px" }}>{userData.bio}</p>
						</div>
						<hr className="my-4 text-warning" />
						{/* Pinned */}
						<div className="card-body px-4">
							<div className="d-flex justify-content-between align-items-center mb-3 fw-bold fst-italic" style={{ fontSize: "20px" }}>Pinned notes</div>

							{/* Template: https://mdbootstrap.com/docs/standard/extended/profiles/#section-4 */}
							<div className="card mb-3" style={{ borderRadius: "15px" }}>
								<div className="card-body p-3">
									{/* Title, Author */}
									<p className="text-start fw-bold" style={{ marginBottom: "3px", fontSize: "20px" }}>Title</p>
									<p className="text-start" style={{ fontSize: "18px" }}><i className="fa fa-star fa-lg text-warning"></i> <span className="mx-1">|</span> Created by
										<strong> username</strong> on (timestamp)</p>
									<hr className="my-3" />
									{/* Content */}
									<p className="text-start" style={{ fontSize: "18px" }}>Sed massa felis, euismod eget bibendum eget, auctor et lorem.</p>
									<hr className="my-3" />
									{/* Collaborators */}
									<div className="d-flex justify-content-end align-items-end me-2">
										<button type="button" className="btn btn-outline-dark btn-warning me-2" style={{ fontSize: "18px" }}>
											<i className="fa fa-user-plus"></i>
										</button>
										<button type="button" className="btn btn-outline-dark btn-warning me-2" style={{ fontSize: "18px" }}>
											<i className="fa fa-share"></i>
										</button>
										<button type="button" className="btn btn-outline-dark btn-warning me-2" style={{ fontSize: "18px" }}>
											<i className="fa fa-pencil"></i>
										</button>
									</div>
								</div>
							</div>

						</div>
					</div >
				</div>

				{/* content */}
				<div className="col col-lg-7 h-100">
					<div className="card border border-1 border-warning bg-dark text-white">
						{/* Pinned */}
						<div className="card-body px-4">
							<div className="d-flex justify-content-between align-items-center mb-3 fw-bold fst-italic" style={{ fontSize: "20px" }}>All notes</div>

							{/* Template: https://mdbootstrap.com/docs/standard/extended/profiles/#section-4 */}
							<div className="card my-4" style={{ borderRadius: "15px" }}>
								<div className="card-body p-3">
									{/* Title, Author */}
									<p className="text-start fw-bold" style={{ marginBottom: "3px", fontSize: "20px" }}>Title</p>
									<p className="text-start" style={{ fontSize: "18px" }}><i className="fa fa-star fa-lg text-warning"></i> <span className="mx-1">|</span> Created by
										<strong> username</strong> on (timestamp)</p>
									<hr className="my-3" />
									{/* Content */}
									<p className="text-start" style={{ fontSize: "18px" }}>Nullam pellentesque pellentesque tellus, et convallis tortor. Curabitur iaculis risus id ullamcorper mattis. Donec convallis diam sed ex hendrerit, nec hendrerit erat bibendum.</p>
									<hr className="my-3" />
									{/* Collaborators */}
									<div className="d-flex justify-content-end align-items-end me-2">
										<button type="button" className="btn btn-outline-dark btn-warning me-2" style={{ fontSize: "18px" }}>
											<i className="fa fa-user-plus"></i>
										</button>
										<button type="button" className="btn btn-outline-dark btn-warning me-2" style={{ fontSize: "18px" }}>
											<i className="fa fa-share"></i>
										</button>
										<button type="button" className="btn btn-outline-dark btn-warning me-2" style={{ fontSize: "18px" }}>
											<i className="fa fa-pencil"></i>
										</button>
									</div>
								</div>
							</div>

							<div className="d-flex justify-content-end align-items-end me-2">
								<button type="button" className="btn btn-outline-warning mt-2 mb-3" style={{ fontSize: "18px" }}>See all notes</button>
							</div>

						</div>
					</div >
				</div>

			</div >
		</div >
	</>;

	// return <>
	// 	{/* Template: 'https://mdbootstrap.com/docs/standard/extended/profiles/#section-5 */}
	// 	<div className="container py-5 h-100">
	// 		<div className="row d-flex justify-content-center align-items-center h-100">
	// 			<div className="col col-lg-6 mb-4 mb-lg-0">
	// 				<div className="card mb-3" style={{ borderRadius: '".5rem" }}>
	// 					<div className="row g-0">
	// 						<div className="col-md-4 bg-dark text-center text-white"
	// 							>
	// 							<img src={logo} alt="Avatar" className="img-fluid border border-warning my-5 px-2 py-2" width="80px" />
	// 							<h5>{userData.username}</h5>
	// 							<p>{userData.email}</p>
	// 							<i className="fa fa-edit mb-5"></i>
	// 						</div>
	// 						<div className="col-md-8">
	// 							<div className="card-body p-4">
	// 								<h6>Information</h6>
	// 								<hr className="mt-0 mb-4" />
	// 								<div className="row pt-1">
	// 									<div className="col-6 mb-3">
	// 										<h6>Email</h6>
	// 										<p className="text-muted">info@example.com</p>
	// 									</div>
	// 									<div className="col-6 mb-3">
	// 										<h6>Phone</h6>
	// 										<p className="text-muted">123 456 789</p>
	// 									</div>
	// 								</div>
	// 								<h6>Projects</h6>
	// 								<hr className="mt-0 mb-4" />
	// 								<div className="row pt-1">
	// 									<div className="col-6 mb-3">
	// 										<h6>Recent</h6>
	// 										<p className="text-muted">Lorem ipsum</p>
	// 									</div>
	// 									<div className="col-6 mb-3">
	// 										<h6>Most Viewed</h6>
	// 										<p className="text-muted">Dolor sit amet</p>
	// 									</div>
	// 								</div>
	// 								<div className="d-flex justify-content-start">
	// 									<a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
	// 									<a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
	// 									<a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
	// 								</div>
	// 							</div>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// </>;
}