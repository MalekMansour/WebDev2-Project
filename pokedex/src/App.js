import React, { useState, useEffect } from "react";
import "./App.css";

// Mapping of Pokémon types to background colors
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

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [moveData, setMoveData] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState("");
  const [searchMove, setSearchMove] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [filteredMoves, setFilteredMoves] = useState([]);
  const [showMoves, setShowMoves] = useState(false);

  // Fetch Pokémon data from the API
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await response.json();

        // Fetch details for each Pokémon
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

  // Fetch Pokémon moves data from the API
  useEffect(() => {
    const fetchMoveData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/move?limit=150");
        const data = await response.json();

        // Fetch details for each move
        const promises = data.results.map(async (move) => {
          const res = await fetch(move.url);
          return res.json();
        });

        const results = await Promise.all(promises);
        setMoveData(results);
        setFilteredMoves(results);
      } catch (error) {
        console.error("Error fetching move data:", error);
      }
    };

    fetchMoveData();
  }, []);

  // Filter Pokémon based on the search term
  useEffect(() => {
    setFilteredPokemon(
      pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
      )
    );
  }, [searchPokemon, pokemonData]);

  // Filter Moves based on the search term
  useEffect(() => {
    setFilteredMoves(
      moveData.filter((move) =>
        move.name.toLowerCase().includes(searchMove.toLowerCase())
      )
    );
  }, [searchMove, moveData]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{showMoves ? "Moves" : "Pokédex"}</h1>
        <input
          type="text"
          placeholder={showMoves ? "Search Moves" : "Search Pokémon"}
          value={showMoves ? searchMove : searchPokemon}
          onChange={(e) =>
            showMoves
              ? setSearchMove(e.target.value)
              : setSearchPokemon(e.target.value)
          }
        />
        <button onClick={() => setShowMoves(!showMoves)}>
          {showMoves ? "View Pokémon" : "View Moves"}
        </button>
      </header>

      <div className="data-grid">
        {showMoves
          ? filteredMoves.map((move, index) => {
              const moveType = move.type.name; // Get the move's type
              const backgroundColor = typeColors[moveType] || "#FFFFFF"; // Default to white if type is not found

              return (
                <div
                  key={index}
                  className="data-card"
                  style={{ backgroundColor }}
                >
                  <h2>{move.name.charAt(0).toUpperCase() + move.name.slice(1)}</h2>
                  <p>Type: {move.type.name.charAt(0).toUpperCase() + move.type.name.slice(1)}</p>
                  <p>Power: {move.power || "N/A"}</p>
                  <p>Accuracy: {move.accuracy || "N/A"}</p>
                  <p>PP: {move.pp || "N/A"}</p>
                </div>
              );
            })
          : filteredPokemon.map((pokemon) => {
              const mainType = pokemon.types[0].type.name; // Get the Pokémon's main type
              const backgroundColor = typeColors[mainType] || "#FFFFFF"; // Default to white if type is not found

              return (
                <div
                  key={pokemon.id}
                  className="data-card"
                  style={{ backgroundColor }}
                >
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                  <h2>
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                  </h2>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default App;
