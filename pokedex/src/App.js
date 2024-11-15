import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import "./App.css";

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

// NavBar Component
function NavBar() {
  return (
    <nav className="NavBar">
      <Link to="/">Pokédex</Link>
      <Link to="/moves">Moves</Link>
      <Link to="/wiki">Wiki</Link>
    </nav>
  );
}

// Pokedex Component
function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await response.json();
      setPokemons(data.results);
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="Pokedex">
      <h1>Pokédex</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="PokemonList">
        {filteredPokemons.map((pokemon, index) => (
          <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
    </div>
  );
}

// PokemonCard Component
function PokemonCard({ name, url }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setPokemon(data);
    };

    fetchPokemonData();
  }, [url]);

  if (!pokemon) return null;

  const mainType = pokemon.types[0].type.name;
  const backgroundColor = getTypeColor(mainType);

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="PokemonCard" style={{ backgroundColor }}>
      <p className="PokemonId">#{pokemon.id}</p>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p className="PokemonName">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
    </Link>
  );
}

// Get color for Pokémon type
function getTypeColor(type) {
  const colors = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
    normal: "#A8A878",
  };
  return colors[type] || "#A8A878";
}

// PokemonDetails Component
function PokemonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
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
      <p><strong>ID:</strong> {pokemon.id}</p>
      <p><strong>Type:</strong> {pokemon.types.map((type) => type.type.name).join(", ")}</p>
      <p><strong>Height:</strong> {pokemon.height}</p>
      <p><strong>Weight:</strong> {pokemon.weight}</p>
      <p><strong>Abilities:</strong> {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</p>
    </div>
  );
}

// Moves Component
function Moves() {
  const [moves, setMoves] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMoves = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/move?limit=200");
      const data = await response.json();
      setMoves(data.results);
    };

    fetchMoves();
  }, []);

  const filteredMoves = moves.filter((move) =>
    move.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="Moves">
      <h1>Moves</h1>
      <input
        type="text"
        placeholder="Search Moves..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="MoveList">
        {filteredMoves.map((move, index) => (
          <MoveCard key={index} name={move.name} url={move.url} />
        ))}
      </div>
    </div>
  );
}

// MoveCard Component
function MoveCard({ name, url }) {
  return (
    <Link to={`/move/${name}`} className="MoveCard">
      <p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
    </Link>
  );
}

// MoveDetails Component
function MoveDetails() {
  const { id } = useParams();
  const [move, setMove] = useState(null);

  useEffect(() => {
    const fetchMove = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/move/${id}`);
      const data = await response.json();
      setMove(data);
    };

    fetchMove();
  }, [id]);

  if (!move) {
    return <div>Loading...</div>;
  }

  return (
    <div className="MoveDetails">
      <h1>{move.name.charAt(0).toUpperCase() + move.name.slice(1)}</h1>
      <p><strong>Accuracy:</strong> {move.accuracy}</p>
      <p><strong>Power:</strong> {move.power}</p>
      <p><strong>PP:</strong> {move.pp}</p>
      <p><strong>Type:</strong> {move.type.name}</p>
    </div>
  );
}

// Wiki Component
function Wiki() {
  return (
    <div className="Wiki">
      <h1>Wiki Links</h1>
      <ul>
        <li><a href="https://bulbapedia.bulbagarden.net/" target="_blank" rel="noopener noreferrer">Bulbapedia</a></li>
        <li><a href="https://www.serebii.net/" target="_blank" rel="noopener noreferrer">Serebii</a></li>
        <li><a href="https://pokemondb.net/" target="_blank" rel="noopener noreferrer">Pokémon Database</a></li>
      </ul>
    </div>
  );
}

export default App;
