import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import PokemonDetail from "./PokemonDetail";
import MovesPage from "./MovesPage";
import WikisPage from "./WikisPage";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
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
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Pokédex</h1>
          <input
            type="text"
            placeholder="Search Pokémon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <nav>
            <Link to="/">Home</Link>
            <Link to="/moves">Moves</Link>
            <Link to="/wikis">Wikis</Link>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <div className="pokemon-grid">
                {filteredPokemon.map((pokemon) => {
                  const mainType = pokemon.types[0]?.type?.name;
                  const backgroundColor = typeColors[mainType] || "#FFFFFF";

                  return (
                    <Link
                      to={`/pokemon/${pokemon.id}`}
                      key={pokemon.id}
                      className="pokemon-card-link"
                    >
                      <div className="pokemon-card" style={{ backgroundColor }}>
                        <div className="pokemon-id">#{pokemon.id}</div>
                        <img
                          src={pokemon.sprites.front_default}
                          alt={pokemon.name}
                        />
                        <h2>
                          {pokemon.name.charAt(0).toUpperCase() +
                            pokemon.name.slice(1)}
                        </h2>
                      </div>
                    </Link>
                  );
                })}
              </div>
            }
          />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/moves" element={<MovesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
