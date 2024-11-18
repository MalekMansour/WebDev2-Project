import React from "react";
import "./WikisPage.css";

function WikisPage() {
  const wikis = [
    { name: "Pokémon Database", url: "https://pokemondb.net/" },
    { name: "Pokémon Wiki", url: "https://pokemon.fandom.com/" },
    { name: "Bulbapedia", url: "https://bulbapedia.bulbagarden.net/" },
    { name: "Serebii", url: "https://www.serebii.net/" },
    { name: "Smogon", url: "https://www.smogon.com/" },
  ];

  return (
    <div className="wikis-page">
      <h1>Pokémon Wikis</h1>
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
