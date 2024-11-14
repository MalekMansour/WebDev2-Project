// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  // Fetch Pokémon data from the API when the component mounts
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
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

  // Filter Pokémon based on search term
  useEffect(() => {
    setFilteredPokemon(
      pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemonData]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokédex</h1>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <div className="pokemon-grid">
        {filteredPokemon.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p><strong>Height:</strong> {pokemon.height}</p>
            <p><strong>Weight:</strong> {pokemon.weight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
