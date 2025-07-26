import axios, { AxiosError } from "axios";
import type { Pokemon, ApiError, SearchType } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2/";

// 入力バリデーション用の正規表現
const NUMERIC_REGEX = /^\d+$/;
const NAME_REGEX = /^[a-zA-Z-]+$/;

type ValidationResult = {
	isValid: boolean;
	errorMessage: string;
};
const createAppError = (message: string, status: number): ApiError => ({
	message,
	status,
});

const validateInput = (query: string, type: SearchType): ValidationResult => {
	if (!query.trim()) {
		return {
			isValid: false,
			errorMessage:
				type === "name"
					? "ポケモンの名前を入力してください"
					: "ポケモンのIDを入力してください",
		};
	}
	if (type === "name") {
		if (query.length < 2) {
			return { isValid: false, errorMessage: "2文字以上で入力してください" };
		}
		if (!NAME_REGEX.test(query)) {
			return { isValid: false, errorMessage: "英字のみ入力可能です" };
		}
	} else {
		if (!NUMERIC_REGEX.test(query) || parseInt(query, 10) < 1) {
			return { isValid: false, errorMessage: "1以上の数値を入力してください" };
		}
	}

	return { isValid: true, errorMessage: "" };
};

export const fetchPokemon = async (
	name: string,
	type: SearchType
): Promise<Pokemon | ApiError> => {
	const trimmedQuery = name.trim();
	const validation = validateInput(name, type);
	if (!validation.isValid) {
		return {
			message: validation.errorMessage,
			status: 400,
		};
	}
	try {
		const response = await axios.get(
			`${BASE_URL}/pokemon/${trimmedQuery.toLowerCase()}`
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			return createAppError(
				error.response?.status === 404
					? `ポケモン "${name}" が見つかりません`
					: `APIエラーが発生しました (${error.response?.status})`,
				error.response?.status || 500
			);
		}
		return createAppError("予期しないエラーが発生しました", 500);
	}
};
