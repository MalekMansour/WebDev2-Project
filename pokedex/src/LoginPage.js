import React from "react";
import { useAuth } from "./AuthContext";

function LoginPage() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="login-page">
      <h1>Welcome to the Pokédex</h1>
      <button onClick={signInWithGoogle} className="login-button">
        Sign in with Google
      </button>
    </div>
  );
}

export default LoginPage;
