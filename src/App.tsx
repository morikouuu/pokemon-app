import { useState } from "react";
import type { FormEvent } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import SearchToggle from "./components/SearchToggle";
import PokemonCard from "./components/PokemonCard";
import type { SearchType } from "./types/pokemon";
import { usePokemonSearch } from "./hooks/usePokemonSearch";
import SkeletonLoader from "./components/SkeletonLoader/SkeletonLoader";

function App() {
	const [searchType, setSearchType] = useState<SearchType>("id");
	const [searchTerm, setSearchTerm] = useState<string>("");
	const { data, isLoading, error, searchPokemon, clearResults } =
		usePokemonSearch();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// 検索
		await searchPokemon(searchTerm, searchType);
		// 初期化
		setSearchTerm("");
	};

	const handleTypeChange = (type: SearchType) => {
		setSearchType(type);
		setSearchTerm("");
		clearResults();
	};

	return (
		<div className="app">
			<SearchToggle searchType={searchType} onTypeChange={handleTypeChange} />
			<SearchForm
				searchType={searchType}
				searchTerm={searchTerm}
				onSearchTermChange={setSearchTerm}
				isLoading={isLoading}
				onSubmit={handleSubmit}
			/>
			{error && <div className="error-message">{error.message}</div>}
			{isLoading && <SkeletonLoader />}
			{data && !isLoading && <PokemonCard pokemon={data} />}
		</div>
	);
}

export default App;
