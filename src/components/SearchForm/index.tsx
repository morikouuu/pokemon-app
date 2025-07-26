import type { FC, FormEvent, ChangeEvent } from "react";
import "./style.css";
import type { SearchType } from "../../types/pokemon";

type SearchFormProps = {
	searchType: SearchType;
	searchTerm: string;
	isLoading: boolean;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	onSearchTermChange: (value: string) => void;
};

const SearchForm: FC<SearchFormProps> = ({
	searchType,
	searchTerm,
	onSearchTermChange,
	isLoading,
	onSubmit,
}) => {
	const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
		onSearchTermChange(e.target.value);
	};

	return (
		<form onSubmit={onSubmit} className="search-form">
			<input
				type={searchType === "id" ? "number" : "text"}
				placeholder={
					searchType === "id" ? "Enter ID(e.g. 25)" : "Enter Name(e.g. Pikachu)"
				}
				value={searchTerm}
				onChange={handleTermChange}
				min={searchType === "id" ? 1 : undefined}
			/>
			<button type="submit" disabled={isLoading}>
				{isLoading ? "Searching..." : "Search"}
			</button>
		</form>
	);
};

export default SearchForm;
