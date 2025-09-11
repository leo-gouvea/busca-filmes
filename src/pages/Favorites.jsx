import "../styles/global.css";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";

export default function Favorites() {
  const { favorites, toggle, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const moviesPerPage = 10;
  const totalPages = Math.ceil(favorites.length / moviesPerPage);

  // Corrige a página atual se ela estiver fora do limite
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages || 1);
    }
  }, [favorites, totalPages]);

  const startIndex = (page - 1) * moviesPerPage;
  const currentMovies = favorites.slice(startIndex, startIndex + moviesPerPage);

  return (
    <div className="page-container fade-in">
      <h1>Meus Favoritos</h1>

      {favorites.length === 0 ? (
        <p>Nenhum filme adicionado ainda.</p>
      ) : (
        <>
          <div className="movies-grid">
            {currentMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFav={isFavorite(movie.id)}
                onToggleFav={toggle}
                onOpen={() => navigate(`/details/${movie.id}`)}
              />
            ))}
          </div>

          {/* Controles de paginação */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page <= 1}
            >
              ◀ Anterior
            </button>

            <span>
              Página {page} de {totalPages || 1}
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages || totalPages === 0}
            >
              Próxima ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}
