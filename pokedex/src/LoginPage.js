import React from "react";
import { useAuth } from "./AuthContext";
import "./loginPage.css";

const LoginPage = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="login-page">
      <h1>Welcome to Pokédex</h1>
      <button onClick={signInWithGoogle} className="login-button">
        Sign in with Google
      </button>
      <img src="/assets/pokemon-left.png" alt="Left Pokémon" className="pokemon-image-left" />
      <img src="/assets/pokemon-right.png" alt="Right Pokémon" className="pokemon-image-right" />
    </div>
  );
};

export default LoginPage;
