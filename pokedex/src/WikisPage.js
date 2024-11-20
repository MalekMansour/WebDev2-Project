import React, { useState } from "react";
import "./WikisPage.css";
import sunIcon from "./assets/sun.png";
import moonIcon from "./assets/moon.png";

function WikisPage() {
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const wikis = [
    { name: "Pokémon Database", url: "https://pokemondb.net/" },
    { name: "Pokémon Wiki", url: "https://pokemon.fandom.com/" },
    { name: "Bulbapedia", url: "https://bulbapedia.bulbagarden.net/" },
    { name: "Serebii", url: "https://www.serebii.net/" },
    { name: "Smogon", url: "https://www.smogon.com/" },
  ];

  return (
    <div className={`wikis-page ${darkMode ? "dark" : ""}`}>
      <div className="header">
        <h1>Pokémon Wikis</h1>
        <button
          className="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          <img
            src={darkMode ? sunIcon : moonIcon}
            alt={darkMode ? "Light Mode" : "Dark Mode"}
          />
        </button>
      </div>
      <ul>
        {wikis.map((wiki) => (
          <li key={wiki.name}>
            <a href={wiki.url} target="_blank" rel="noopener noreferrer">
              {wiki.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WikisPage;
