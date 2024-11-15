import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
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

// Navigation Bar Component
function NavBar() {
  return (
    <nav className="NavBar">
      <Link to="/">Pokémon</Link>
      <Link to="/moves">Moves</Link>
      <Link to="/wiki">Wiki</Link>
    </nav>
  );
}

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

// Moves Page
function Moves() {
  const [moves, setMoves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMoves, setFilteredMoves] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/move?limit=150");
        const data = await response.json();

        const promises = data.results.map(async (move) => {
          const res = await fetch(move.url);
          return res.json();
        });

        const results = await Promise.all(promises);
        setMoves(results);
        setFilteredMoves(results);
      } catch (error) {
        console.error("Error fetching moves:", error);
      }
    };

    fetchMoves();
  }, []);

  useEffect(() => {
    setFilteredMoves(
      moves.filter((move) =>
        move.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, moves]);

  return (
    <div className="Moves">
      <header className="Moves-header">
        <h1>Pokémon Moves</h1>
        <input
          type="text"
          placeholder="Search Moves"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <div className="pokemon-grid">
        {filteredMoves.map((move) => {
          const mainType = move.type?.name || "normal";
          const backgroundColor = typeColors[mainType] || "#FFFFFF";

          return (
            <div
              key={move.id}
              className="pokemon-card"
              style={{ backgroundColor }}
              onClick={() => navigate(`/move/${move.id}`)}
            >
              <span className="pokemon-id">#{move.id}</span>
              <h2>{move.name.charAt(0).toUpperCase() + move.name.slice(1)}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Move Details Page
function MoveDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [move, setMove] = useState(null);

  useEffect(() => {
    const fetchMove = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/move/${id}`);
        const data = await response.json();
        setMove(data);
      } catch (error) {
        console.error("Error fetching move details:", error);
      }
    };

    fetchMove();
  }, [id]);

  if (!move) {
    return <div>Loading...</div>;
  }

  return (
    <div className="MoveDetails">
      <button onClick={() => navigate("/moves")}>Back to Moves</button>
      <h1>{move.name.charAt(0).toUpperCase() + move.name.slice(1)}</h1>
      <p><strong>Type:</strong> {move.type?.name || "Unknown"}</p>
      <p><strong>Power:</strong> {move.power || "N/A"}</p>
      <p><strong>PP:</strong> {move.pp}</p>
      <p><strong>Accuracy:</strong> {move.accuracy || "N/A"}</p>
      <p><strong>Description:</strong> {move.effect_entries[0]?.short_effect || "N/A"}</p>
    </div>
  );
}

// Wiki Page
function Wiki() {
  const links = [
    { name: "Bulbapedia", url: "https://bulbapedia.bulbagarden.net/" },
    { name: "Pokémon Database", url: "https://pokemondb.net/" },
    { name: "Pokémon Wiki", url: "https://pokemon.fandom.com/" },
  ];

  return (
    <div className="Wiki">
      <h1>Pokémon Wiki Links</h1>
      <ul>
        {links.map((link) => (
          <li key={link.name}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path="/moves" element={<Moves />} />
        <Route path="/move/:id" element={<MoveDetails />} />
        <Route path="/wiki" element={<Wiki />} />
      </Routes>
    </Router>
  );
}

export default App;
