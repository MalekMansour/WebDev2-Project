import React, { useState, useEffect } from "react";
import "./MovesPage.css";

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

const MovesPage = () => {
  const [moves, setMoves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all moves from the API
  useEffect(() => {
    const fetchMoves = async () => {
      try {
        // Fetch the full list of moves
        const response = await fetch("https://pokeapi.co/api/v2/move?limit=1000"); // Fetch up to 1000 moves
        const data = await response.json();

        const moveDetails = await Promise.all(
          data.results.map(async (move) => {
            const res = await fetch(move.url);
            return res.json();
          })
        );

        setMoves(moveDetails);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching moves:", error);
        setIsLoading(false);
      }
    };

    fetchMoves();
  }, []);

  // Filter moves based on the search term
  const filteredMoves = moves.filter((move) =>
    move.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="moves-page">
      <h1>Pokémon Moves</h1>
      <input
        type="text"
        placeholder="Search Moves"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading ? (
        <p>Loading moves...</p>
      ) : (
        <div className="moves-grid">
          {filteredMoves.map((move) => {
            const mainType = move.type.name; // Get move type
            const backgroundColor = typeColors[mainType] || "#ccc"; // Default to grey if type not found

            return (
              <div
                key={move.id}
                className="move-card"
                style={{ backgroundColor }}
              >
                <h3>{move.name.charAt(0).toUpperCase() + move.name.slice(1)}</h3>
                <p><strong>Type:</strong> {mainType.charAt(0).toUpperCase() + mainType.slice(1)}</p>
                <p><strong>Power:</strong> {move.power || "N/A"}</p>
                <p><strong>Accuracy:</strong> {move.accuracy || "N/A"}%</p>
                <p><strong>PP:</strong> {move.pp}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MovesPage;
