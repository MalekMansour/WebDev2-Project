import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
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
    const fetchMoveData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/move?limit=150");
        const data = await response.json();
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

  useEffect(() => {
    setFilteredPokemon(
      pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
      )
    );
  }, [searchPokemon, pokemonData]);

  useEffect(() => {
    setFilteredMoves(
      moveData.filter((move) =>
        move.name.toLowerCase().includes(searchMove.toLowerCase())
      )
    );
  }, [searchMove, moveData]);

  return (
    <Router>
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

        <Routes>
          <Route
            path="/"
            element={
              <div className="data-grid">
                {showMoves
                  ? filteredMoves.map((move, index) => {
                      const moveType = move.type.name;
                      const backgroundColor = typeColors[moveType] || "#FFFFFF";

                      return (
                        <Link to={`/move/${move.name}`} key={index}>
                          <div
                            className="data-card"
                            style={{ backgroundColor }}
                          >
                            <h2>{move.name}</h2>
                            <p>Type: {move.type.name}</p>
                            <p>Power: {move.power || "N/A"}</p>
                            <p>Accuracy: {move.accuracy || "N/A"}</p>
                          </div>
                        </Link>
                      );
                    })
                  : filteredPokemon.map((pokemon) => {
                      const mainType = pokemon.types[0].type.name;
                      const backgroundColor = typeColors[mainType] || "#FFFFFF";

                      return (
                        <Link to={`/pokemon/${pokemon.name}`} key={pokemon.id}>
                          <div
                            className="data-card"
                            style={{ backgroundColor }}
                          >
                            <img
                              src={pokemon.sprites.front_default}
                              alt={pokemon.name}
                            />
                            <h2>{pokemon.name}</h2>
                          </div>
                        </Link>
                      );
                    })}
              </div>
            }
          />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
          <Route path="/move/:name" element={<MoveDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setPokemon(data);
    };
    fetchPokemon();
  }, [name]);

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className="details">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Base Experience: {pokemon.base_experience}</p>
      <h2>Abilities:</h2>
      <ul>
        {pokemon.abilities.map((ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  );
}

function MoveDetails() {
  const { name } = useParams();
  const [move, setMove] = useState(null);

  useEffect(() => {
    const fetchMove = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/move/${name}`);
      const data = await response.json();
      setMove(data);
    };
    fetchMove();
  }, [name]);

  if (!move) return <p>Loading...</p>;

  return (
    <div className="details">
      <h1>{move.name}</h1>
      <p>Type: {move.type.name}</p>
      <p>Power: {move.power || "N/A"}</p>
      <p>Accuracy: {move.accuracy || "N/A"}</p>
      <p>PP: {move.pp}</p>
      <p>Effect: {move.effect_entries[0]?.short_effect || "N/A"}</p>
    </div>
  );
}

export default App;
