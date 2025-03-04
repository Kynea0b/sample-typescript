import React, { useState } from "react";
import { goodbye } from "./api";

const Goodbye: React.FC = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const greeting = await goodbye(name);
      setMessage(greeting);
      setError("");
    } catch (error: any) {
      console.error("Error:", error);
      setError(error.message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Greet</button>

      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Goodbye;
