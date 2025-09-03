import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <Router>
      {/* Menu de navegação */}
      <nav style={{ display: "flex", gap: 12, marginBottom: 16 }} className="navbar">
        <Link to="/">Busca</Link>
        <Link to="/favorites">Favoritos</Link>
      </nav>

      {/* Definição das rotas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}
