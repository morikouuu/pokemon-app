import type { FC } from "react";
import "./style.css";
import type { Pokemon } from "../../types/pokemon";
import { typeColors } from "../../utils/typeColor";

type PokemonCardProps = {
	pokemon: Pokemon;
};

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
	return (
		<div className="pokemon-card">
			{pokemon && (
				<>
					<div className="pokemon-image-grid">
						<div className="image-container">
							{pokemon.sprites.front_default ? (
								<img
									src={pokemon.sprites.front_default}
									alt={`${pokemon.name} front default`}
									className="pokemon-sprite"
								/>
							) : (
								<div className="no-sprite">No Image</div>
							)}
							<span className="sprite-label">Front Default</span>
						</div>
						<div className="image-container">
							{pokemon.sprites.front_shiny ? (
								<img
									src={pokemon.sprites.front_shiny}
									alt={`${pokemon.name} front shiny`}
									className="pokemon-sprite"
								/>
							) : (
								<div className="no-sprite">No Image</div>
							)}
							<span className="sprite-label">Front Shiny</span>
						</div>
						<div className="image-container">
							{pokemon.sprites.back_default ? (
								<img
									src={pokemon.sprites.back_default}
									alt={`${pokemon.name} back default`}
									className="pokemon-sprite"
								/>
							) : (
								<div className="no-sprite">No Image</div>
							)}
							<span className="sprite-label">Back Default</span>
						</div>
						<div className="image-container">
							{pokemon.sprites.back_shiny ? (
								<img
									src={pokemon.sprites.back_shiny}
									alt={`${pokemon.name} back shiny`}
									className="pokemon-sprite"
								/>
							) : (
								<div className="no-sprite">No Image</div>
							)}
							<span className="sprite-label">Back Shiny</span>
						</div>
					</div>
					<div className="pokemon-info">
						<h2>{pokemon.name}</h2>
						<div className="pokemon-id">#{pokemon.id}</div>
						<div className="pokemon-types">
							{pokemon.types.map((typeInfo, index) => (
								<span
									key={index}
									className="type-badge"
									style={{
										background: typeColors[typeInfo.type.name],
									}}
								>
									{typeInfo.type.name}
								</span>
							))}
						</div>
						<div className="pokemon-details">
							<div className="detail-item">
								<span>{(pokemon.height / 10).toFixed(1)}</span>
								<span>m</span>
							</div>
							<div className="detail-item">
								<span>{(pokemon.weight / 10).toFixed(1)}</span>
								<span>kg</span>
							</div>
							<div className="detail-item">
								{pokemon.abilities
									.map((ability) => ability.ability.name)
									.join(", ")}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default PokemonCard;
