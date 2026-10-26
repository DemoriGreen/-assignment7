import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext(null);
const STORAGE_KEY = "movieshelf-watchlist";

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch (error) {
      console.error("Could not save MovieShelf watchlist:", error);
    }
  }, [watchlist]);

  const addMovie = (movie) => setWatchlist(current =>
    current.some(item => item.id === movie.id) ? current : [...current, movie]
  );
  const removeMovie = (movieId) => setWatchlist(current =>
    current.filter(movie => movie.id !== movieId)
  );
  const toggleWatchlist = (movie) => setWatchlist(current =>
    current.some(item => item.id === movie.id)
      ? current.filter(item => item.id !== movie.id)
      : [...current, movie]
  );

  return <MovieContext.Provider value={{ watchlist, addMovie, removeMovie, toggleWatchlist }}>
    {children}
  </MovieContext.Provider>;
}

export function useMovies() {
  const context = useContext(MovieContext);
  if (!context) throw new Error("useMovies must be used inside a MovieProvider");
  return context;
}
