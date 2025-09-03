import axios from "axios";

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3", 
  params: {
    api_key: "99fb605f23bd60c8b4b03b387433d7db",
    language: "pt-BR",
  },
});

// Constante para montar URL de imagens
export const IMG_500 = "https://image.tmdb.org/t/p/w500";