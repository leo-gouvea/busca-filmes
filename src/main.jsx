import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { FavoritesProvider } from "./context/FavoritesContext";
import { SearchProvider } from "./context/SearchContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/busca-filmes">
      <FavoritesProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
