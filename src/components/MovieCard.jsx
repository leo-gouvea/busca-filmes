// src/components/MovieCard.jsx
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function MovieCard({ movie, onOpen, isFav, onToggleFav }) {
  return (
    <div className="movie-card">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          onClick={onOpen}
          className="poster"
        />
      ) : (
        <p>Sem imagem</p>
      )}

      <div className="card-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>

      {onToggleFav && (
        <button className="fav-btn" onClick={() => onToggleFav(movie)}>
          {isFav ? <FaHeart color="red" /> : <FaRegHeart />}{" "}
          {isFav ? " Remover" : " Favoritar"}
        </button>
      )}
    </div>
  );
}
