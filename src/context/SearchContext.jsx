import { createContext, useContext, useState, useEffect } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1); // 👈 agora guardamos a página também

  // Persistência no sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("searchState");
    if (saved) {
      const { searchTerm, results, page } = JSON.parse(saved);
      setSearchTerm(searchTerm);
      setResults(results);
      setPage(page);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "searchState",
      JSON.stringify({ searchTerm, results, page })
    );
  }, [searchTerm, results, page]);

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, results, setResults, page, setPage }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
