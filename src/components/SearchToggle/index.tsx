import type { FC } from "react";
import "./style.css";
import type { SearchType } from "../../types/pokemon";

type SearchTypeProps = {
	searchType: SearchType;
	onTypeChange: (type: SearchType) => void;
};

const SearchToggle: FC<SearchTypeProps> = ({ searchType, onTypeChange }) => {
	return (
		<div className="search-toggle">
			<button
				type="button"
				className={`id ${searchType === "id" ? "active" : ""}`}
				onClick={() => onTypeChange("id")}
			>
				Search by ID
			</button>
			<button
				type="button"
				className={`name ${searchType === "name" ? "active" : ""}`}
				onClick={() => onTypeChange("name")}
			>
				Search by Name
			</button>
		</div>
	);
};

export default SearchToggle;
