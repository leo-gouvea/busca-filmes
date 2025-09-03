import { tmdb } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

export default function Home() {
  const { searchTerm, setSearchTerm, results, setResults, page, setPage } = useSearch();
  const { toggle, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const moviesPerPage = 10; // 2 linhas x 5 colunas
  const totalPages = Math.ceil(results.length / moviesPerPage);

  const startIndex = (page - 1) * moviesPerPage;
  const currentMovies = results.slice(startIndex, startIndex + moviesPerPage);

  async function searchMovies(e) {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const res = await tmdb.get("/search/movie", { params: { query: searchTerm } });
      setResults(res.data.results);
      setPage(1); // reseta para página 1 em nova busca
    } catch {
      console.error("Erro ao buscar filmes.");
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

      {results.length === 0 && <p>Nenhum resultado ainda.</p>}

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

      {/* Paginação */}
      {results.length > 0 && (
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
