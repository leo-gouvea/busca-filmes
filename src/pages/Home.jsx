import { useState } from "react";
import { tmdb } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import { SkeletonGrid } from "../components/Skeletons";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

export default function Home() {
  const { searchTerm, setSearchTerm, results, setResults, page, setPage } = useSearch();
  const { toggle, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const moviesPerPage = 10;
  const totalPages = Math.ceil(results.length / moviesPerPage);
  const startIndex = (page - 1) * moviesPerPage;
  const currentMovies = results.slice(startIndex, startIndex + moviesPerPage);

  async function searchMovies(e) {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);

    try {
      let allResults = [];
      let currentPage = 1;
      let totalPages = 1;

      do {
        const res = await tmdb.get("/search/movie", {
          params: { query: searchTerm, page: currentPage },
        });

        allResults = [...allResults, ...res.data.results];
        totalPages = Math.min(res.data.total_pages, 50);
        currentPage++;
      } while (currentPage <= totalPages);

      setResults(allResults);
      setPage(1);
    } catch {
      console.error("Erro ao buscar filmes.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="page-container fade-in">
      <h1>Buscar Filmes</h1>

      <form onSubmit={searchMovies} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={searchTerm}
          placeholder="Digite o nome do filme..."
          onChange={(e) => setSearchTerm(e.target.value)}
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

      {isLoading && <p>Carregando filmes... isso pode levar alguns segundos.</p>}
      {!isLoading && results.length === 0 && <p>Nenhum resultado ainda.</p>}

      <div className="movies-grid">
        {isLoading ? (
          <SkeletonGrid count={10} />
        ) : (
          currentMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFav={isFavorite(movie.id)}
              onToggleFav={toggle}
              onOpen={() => navigate(`/details/${movie.id}`)}
            />
          ))
        )}
      </div>

      {!isLoading && results.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            ◀ Anterior
          </button>
          <span>
            Página {page} de {totalPages}
          </span>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
            Próxima ▶
          </button>
        </div>
      )}
    </div>
  );
}
