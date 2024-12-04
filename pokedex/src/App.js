import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth, provider } from "./firebase/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import "./App.css";
import PokemonDetail from "./PokemonDetail";
import MovesPage from "./MovesPage";
import WikisPage from "./WikisPage";
import LoginPage from "./LoginPage"; 
import sunIcon from "./assets/sun.png";
import moonIcon from "./assets/moon.png";
const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
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
};

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => setUser(null));
  };

  useEffect(() => {
    if (!user) return;

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
  }, [user]);

  useEffect(() => {
    setFilteredPokemon(
      pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemonData]);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  if (!user) {
    return (
      <div className="login-screen">
        <h1>Welcome to Pokédex</h1>
        <button onClick={handleLogin} className="login-button">
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <Router>
      <div className={`App ${isDarkMode ? "dark" : ""}`}>
        <header className="App-header">
          <h1>Pokédex</h1>
          <input
            type="text"
            placeholder="Search Pokémon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            <img
              src={isDarkMode ? sunIcon : moonIcon}
              alt="Toggle Dark Mode"
              className="toggle-icon"
            />
          </button>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
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
          <Route path="/wikis" element={<WikisPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;