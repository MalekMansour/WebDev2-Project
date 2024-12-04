import React from "react";
import { useAuth } from "./AuthContext";
import "./LoginPage.css";
import pikachu from "./assets/pikachu.png";
import bulbasaur from "./assets/bulbasaur.png";

function LoginPage() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="login-page">
      <h1>Welcome to the Pokédex</h1>
      <button onClick={signInWithGoogle} className="login-button">
        Sign in with Google
      </button>
      <img src={pikachu} alt="Pikachu" className="pokemon-image-left" />
      <img src={bulbasaur} alt="Bulbasaur" className="pokemon-image-right" />
    </div>
  );
}

export default LoginPage;
