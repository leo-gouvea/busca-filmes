import { useState } from "react";
import { tmdb } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";
import { SkeletonGrid } from "../components/Skeletons"; // 👈

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { toggle, isFavorite } = useFavorites();
  const navigate = useNavigate();

  async function searchMovies(e, newPage = 1) {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError("");
      const res = await tmdb.get("/search/movie", {
        params: { query, page: newPage },
      });
      setMovies(res.data.results);
      setTotalPages(res.data.total_pages);
      setPage(newPage);
    } catch {
      setError("Erro ao buscar filmes.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container fade-in">
      <h1>Buscar Filmes</h1>

      <form onSubmit={(e) => searchMovies(e)} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          placeholder="Digite o nome do filme..."
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "8px",
            width: "300px",
            borderRadius: "4px",
            border: "none",
            marginRight: "8px",
          }}
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p>{error}</p>}

      {/* 👉 enquanto carrega, mostra shimmer */}
      {loading ? (
        <SkeletonGrid count={10} />
      ) : movies.length === 0 ? (
        <p>Nenhum resultado ainda.</p>
      ) : (
        <>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFav={isFavorite(movie.id)}
                onToggleFav={toggle}
                onOpen={() => navigate(`/details/${movie.id}`)}
              />
            ))}
          </div>

          <div style={{ marginTop: 20, display: "flex", gap: 10, justifyContent: "center" }}>
            <button onClick={() => searchMovies(null, page - 1)} disabled={page === 1}>
              ◀ Anterior
            </button>
            <span>Página {page} de {totalPages}</span>
            <button onClick={() => searchMovies(null, page + 1)} disabled={page === totalPages}>
              Próxima ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}
