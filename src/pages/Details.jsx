import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { tmdb, IMG_500 } from "../api/tmdb";
import { useFavorites } from "../context/FavoritesContext";
import { DetailsSkeleton } from "../components/Skeletons"; // 👈

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { toggle, isFavorite } = useFavorites();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const [dRes, cRes] = await Promise.all([
          tmdb.get(`/movie/${id}`),
          tmdb.get(`/movie/${id}/credits`),
        ]);
        setMovie(dRes.data);
        setCredits(cRes.data);
      } catch {
        setError("Não foi possível carregar detalhes.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="page-container"><DetailsSkeleton /></div>;
  if (error) return <div className="page-container"><p>{error}</p></div>;
  if (!movie) return null;

  const directors = credits?.crew?.filter((p) => p.job === "Director").map((p) => p.name).join(", ");
  const cast = credits?.cast?.slice(0, 5).map((p) => p.name).join(", ");

  return (
    <div className="page-container fade-in">
      <button onClick={() => navigate(-1)}>← Voltar</button>
      <h1>{movie.title}</h1>

      <img
        src={`${IMG_500}${movie.poster_path}`}
        alt={movie.title}
        style={{ width: 250, borderRadius: 8, marginBottom: 20 }}
      />

      <p><strong>Ano:</strong> {movie.release_date?.slice(0, 4)}</p>
      <p><strong>Duração:</strong> {movie.runtime} min</p>
      <p><strong>Nota:</strong> {movie.vote_average?.toFixed(1)}</p>
      <p><strong>Diretor:</strong> {directors}</p>
      <p><strong>Elenco:</strong> {cast}</p>
      <p><strong>Sinopse:</strong> {movie.overview}</p>

      <button onClick={() => toggle(movie)}>
        {isFavorite(movie.id) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
      </button>
    </div>
  );
}
