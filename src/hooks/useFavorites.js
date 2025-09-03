import { useState, useEffect } from "react";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Erro ao carregar favoritos:", e);
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggle(movie) {
    if (favorites.find((f) => f.id === movie.id)) {
      setFavorites(favorites.filter((f) => f.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  }

  function isFavorite(id) {
    return favorites.some((f) => f.id === id);
  }

  return { favorites, toggle, isFavorite };
}
