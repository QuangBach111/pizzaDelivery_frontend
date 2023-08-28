import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		if (!query) return;
		navigate(`/order/${query}`);
		setQuery("");
	}
	return (
		<div onSubmit={handleSubmit}>
			<form>
				<input
					placeholder="Search order #"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="rounded-full px-4 py-2 text-sm bg-yellow w-28   transition-all duration-300 focus:outline-none focus:ring focus:ring-yelow-300  sm:focus:w-72 sm:w-64"
				/>
			</form>
		</div>
	);
}

export default SearchOrder;
