import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetail.css";

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
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
        style={{ backgroundColor: typeColors[mainType] || "#fafafa" }}
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
        <div className="stats">
          <h3>Base Stats:</h3>
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name} className="stat">
              <span>{stat.stat.name.toUpperCase()}:</span>
              <span>{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
