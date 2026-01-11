import { createContext, useContext, useEffect, useState } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentPlayer, setCurrentPlayer] = useState(() => {
    const storedPlayer = localStorage.getItem("currentPlayer");
    return storedPlayer ? JSON.parse(storedPlayer) : null;
  });

  const clearPlayer = () => {
    localStorage.removeItem("currentPlayer");
    setCurrentPlayer(null);
  };

  useEffect(function () {
    if (currentPlayer) {
      localStorage.setItem("currentPlayer", JSON.stringify(currentPlayer));
    } else {
      localStorage.removeItem("currentPlayer");
    }
  }, [currentPlayer]);

  return (
    <PlayerContext.Provider
      value={{
        currentPlayer,
        setCurrentPlayer,
        clearPlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within PlayerProvider");
  }
  return context;
}
