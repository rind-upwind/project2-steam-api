import React, { useState } from "react";

const App: React.FC = () => {
	const [query, setQuery] = useState("");
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const fetchData = async (query: string) => {
		const url = `${import.meta.env.VITE_RAPIDAPI_URL}${query}/page/1`;
		const options = {
			method: "GET",
			headers: {
				"x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
				"x-rapidapi-host": "steam2.p.rapidapi.com",
			},
		};

		setLoading(true);
		setError("");

		try {
			const response = await fetch(url, options);
			if (!response.ok) throw new Error("Network response was not ok");
			const result = await response.json();
			setData(result);
		} catch (exception) {
			setError(exception as string);
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = () => {
		fetchData(query);
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<div className="input-group mb-3">
						<input
							type="text"
							value={query}
							className="form-control"
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search for games"
						/>
						<button
							className="btn btn-primary"
							onClick={handleSearch}
						>
							Search
						</button>
					</div>
					{loading && (
						<div className="d-flex justify-content-center my-3">
							<div className="spinner-border" role="status">
								<span className="visually-hidden">
									Loading...
								</span>
							</div>
						</div>
					)}
					{error && (
						<div className="alert alert-warning">{error}</div>
					)}
				</div>
			</div>
			<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
				{data.map((item, index) => (
					<div className="col" key={index}>
						<article className="card h-100 shadow-sm">
							<div className="card-body">
								<h5 className="card-title">{item.name}</h5>
								<p className="card-text">{item.email}</p>
							</div>
						</article>
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
