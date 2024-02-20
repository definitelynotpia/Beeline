export default function Dashboard() {
	return <>
		<div className="text-center">
			<h1 className="display-4 fw-bold"><span className="text-warning">BEELINE:</span> Your hive for collaboration.</h1>
			<div className="col-lg-6 mx-auto">
				<p className="lead mb-4">Unleash your creativity and streamline your brainstorming process with Beeline, the hive of collaboration for your ideas! Whether you're buzzing with inspiration solo or building a hive of collaborators, Beeline provides the perfect platform to develop concepts with ease. Stay on track with notes and diagrams (coming soon), and effortlessly share your works with friends and coworkers. Join the hive and experience the sweet satisfaction of turning ideas into reality together with Beeline!</p>
				<div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
					<button type="button" className="btn btn-outline-warning btn-lg px-4">Write a note</button>
					<button type="button" className="btn btn-warning btn-lg px-4 me-sm-3">Join the hive</button>
				</div>
			</div>
		</div>
	</>
}