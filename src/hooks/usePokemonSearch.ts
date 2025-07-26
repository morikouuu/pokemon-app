import { useState, useCallback } from "react";
import { fetchPokemon } from "../api/pokemonApi";
import type { Pokemon, SearchType, ApiError } from "../types/pokemon";

type UsePokemonSearch = {
	data: Pokemon | null;
	isLoading: boolean;
	error: ApiError | null;
	searchPokemon: (term: string, type: SearchType) => Promise<void>;
	clearResults: () => void;
};

export const usePokemonSearch = (): UsePokemonSearch => {
	const [data, setData] = useState<Pokemon | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<ApiError | null>(null);

	// 実際にポケモンのデータを取得
	const searchPokemon = useCallback(
		async (term: string, type: SearchType): Promise<void> => {
			// 入力値があることを確認
			// 初期化
			setError(null);
			setData(null);
			// データを取得
			try {
				setIsLoading(true);
				const result = await fetchPokemon(term, type);
				if ("status" in result && "message" in result) {
					setError(result);
				} else {
					setData(result);
				}
			} catch (error) {
				const appErr = error as ApiError;
				setError({
					message: appErr.message || "予期しないエラーが発生しました",
					status: appErr.status || 500,
				});
			} finally {
				setIsLoading(false);
			}
		},
		[]
	);

	const clearResults = () => {
		setData(null);
		setError(null);
	};

	return {
		data,
		isLoading,
		error,
		searchPokemon,
		clearResults,
	};
};
