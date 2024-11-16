import React, { useEffect, useState } from "react";
import "./MovesPage.css";

function MovesPage() {
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/move?limit=100");
        const data = await response.json();
        setMoves(data.results);
      } catch (error) {
        console.error("Error fetching moves:", error);
      }
    };

    fetchMoves();
  }, []);

  return (
    <div className="moves-page">
      <h1>Pokémon Moves</h1>
      <div className="moves-grid">
        {moves.map((move, index) => (
          <div key={index} className="move-card">
            <h3>{move.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovesPage;
