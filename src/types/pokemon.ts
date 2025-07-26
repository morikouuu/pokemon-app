export type Pokemon = {
	id: number;
	name: string;
	height: number;
	weight: number;
	sprites: PokemonSprites;
	types: PokemonType[];
	abilities: PokemonAbility[];
};

export type PokemonSprites = {
	front_default: string | null;
	back_default: string | null;
	front_shiny: string | null;
	back_shiny: string | null;
	other: {
		showdown: {
			front_default: string | null;
			back_default: string | null;
			front_shiny: string | null;
			back_shiny: string | null;
		};
	};
};

export type PokemonType = {
	type: {
		name: string;
		url: string;
	};
};

export type PokemonAbility = {
	ability: {
		name: string;
		url: string;
	};
	is_hidden: boolean;
	slot: number;
};
export type SearchType = "name" | "id";
export type SearchResult = Pokemon | null;

export type ApiError = {
	message: string;
	status: number | undefined;
};
