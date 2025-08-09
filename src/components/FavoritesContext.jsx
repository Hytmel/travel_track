import React, { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteDestinations, setFavoriteDestinations] = useState([]);

  const toggleFavorite = (destination) => {
    setFavoriteDestinations((prev) => {
      const exists = prev.find((d) => d.id === destination.id);
      if (exists) {
        return prev.filter((d) => d.id !== destination.id);
      } else {
        return [...prev, destination];
      }
    });
  };

  const isFavorite = (destinationId) => {
    return favoriteDestinations.some((d) => d.id === destinationId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteDestinations, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
