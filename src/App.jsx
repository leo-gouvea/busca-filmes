import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <>
      {/* Menu de navegação */}
      <nav className="navbar" style={{ gap: 12, marginBottom: 16 }}>
        <Link to="/">Busca</Link>
        <Link to="/favorites">Favoritos</Link>
      </nav>

      {/* Rotas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}
