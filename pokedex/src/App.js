import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import "./App.css";

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

// Pokedex Page
function Pokedex() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await response.json();

        const promises = data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        });

        const results = await Promise.all(promises);
        setPokemonData(results);
        setFilteredPokemon(results);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemonData();
  }, []);

  useEffect(() => {
    setFilteredPokemon(
      pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemonData]);

  return (
    <div className="Pokedex">
      <header className="Pokedex-header">
        <h1>Pokédex</h1>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <div className="pokemon-grid">
        {filteredPokemon.map((pokemon) => {
          const mainType = pokemon.types[0].type.name;
          const backgroundColor = typeColors[mainType] || "#FFFFFF";

          return (
            <div
              key={pokemon.id}
              className="pokemon-card"
              style={{ backgroundColor }}
              onClick={() => navigate(`/pokemon/${pokemon.id}`)}
            >
              <span className="pokemon-id">#{pokemon.id}</span>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Pokemon Details Page
function PokemonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemon();
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="PokemonDetails">
      <button onClick={() => navigate("/")}>Back to Pokédex</button>
      <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p><strong>ID:</strong> #{pokemon.id}</p>
      <p><strong>Type(s):</strong> {pokemon.types.map((t) => t.type.name).join(", ")}</p>
      <p><strong>Height:</strong> {pokemon.height}</p>
      <p><strong>Weight:</strong> {pokemon.weight}</p>
      <p><strong>Abilities:</strong> {pokemon.abilities.map((a) => a.ability.name).join(", ")}</p>
      <p><strong>Base Stats:</strong></p>
      <ul>
        {pokemon.stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
