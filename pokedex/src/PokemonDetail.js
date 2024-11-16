import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetail.css";

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  // Add other type colors
};

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  const mainType = pokemon.types[0]?.type?.name;

  return (
    <div className="pokemon-detail">
      <div
        className="pokemon-detail-card"
        style={{ backgroundColor: typeColors[mainType] || "#FFFFFF" }}
      >
        <h1>{pokemon.name.toUpperCase()}</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>
          <strong>Height:</strong> {pokemon.height}
        </p>
        <p>
          <strong>Weight:</strong> {pokemon.weight}
        </p>
        <p>
          <strong>Types:</strong>{" "}
          {pokemon.types.map((type) => type.type.name).join(", ")}
        </p>
        <p>
          <strong>Base Stats:</strong>{" "}
          {pokemon.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join(", ")}
        </p>
      </div>
    </div>
  );
}

export default PokemonDetail;
