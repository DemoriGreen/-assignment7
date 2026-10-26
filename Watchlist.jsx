import { useMovies } from "../contexts/MovieContext.jsx";
import MovieCard from "../components/MovieCard.jsx";

export default function Watchlist({ favorites = [], onToggleFavorite = () => {}, onSelect = () => {} }) {
  const { watchlist, removeMovie } = useMovies();

  return <main className="page-shell">
    <section className="favorites-banner">
      <p className="eyebrow">SAVE IT FOR LATER</p>
      <h1>My <span>Watchlist.</span></h1>
      <p>Movies you want to watch next.</p>
      <div className="collection-count">
        <strong>{watchlist.length}</strong>
        <span>{watchlist.length === 1 ? "movie saved" : "movies saved"}</span>
      </div>
    </section>
    {watchlist.length === 0 ? <section className="empty-state">
      <h2>Your watchlist is empty</h2>
      <p>Add movies from Discover and they will appear here.</p>
      <a className="button button-primary" href="/">Explore movies</a>
    </section> : <section className="movie-grid" aria-label="Movies in your watchlist">
      {watchlist.map(movie => <div className="watchlist-card" key={movie.id}>
        <MovieCard movie={movie}
          isFavorite={favorites.some(item => item.id === movie.id)}
          onToggleFavorite={onToggleFavorite} onSelect={onSelect} />
        <button type="button" className="watchlist-remove" onClick={() => removeMovie(movie.id)}>
          Remove from Watchlist
        </button>
      </div>)}
    </section>}
  </main>;
}
