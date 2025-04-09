import { useEffect, useState } from "react";
import StarRating from "./StarRating";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
function Logo() {
  return (
    <div className="logo">
      <h1>Movie Dunia</h1>
    </div>
  );
}

function Search({ query, setQuery, movies, onSelectMovie, onFocus }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="search-container">
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          setIsFocused(true);
          onFocus(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setIsFocused(false);
            onFocus(false);
          }, 200);
        }}
      />
      {isFocused && query.length > 0 && (
        <div className="search-dropdown">
          {movies.slice(0, 5).map((movie) => (
            <div
              key={movie.imdbID}
              className="search-result-item"
              onClick={() => {
                onSelectMovie(movie.imdbID);
                setIsFocused(false);
                onFocus(false);
              }}
            >
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <div className="search-result-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchMatched({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Movie({ movie, onSelectMovie }) {
  return (
    <div className="movie-card" onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="movie-grid">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

// function Box({ children }) {
//   const [isOpen, setIsOpen] = useState(true);
//   return (
//     <div className="box">
//       <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
//         {isOpen ? "–" : "+"}
//       </button>
//       {isOpen && children}
//     </div>
//   );
// }
// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchSummary watched={watched} />
//           <WatchMovieList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }

// function WatchSummary({ watched }) {
//   const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
//   const avgUserRating = average(watched.map((movie) => movie.userRating));
//   const avgRuntime = average(watched.map((movie) => movie.runtime));

//   return (
//     <div className="summary">
//       <h2>Movies you watched</h2>
//       <div>
//         <p>
//           <span>#️⃣</span>
//           <span>{watched.length} movies</span>
//         </p>
//         <p>
//           <span>⭐️</span>
//           <span>{avgImdbRating.toFixed(2)}</span>
//         </p>
//         <p>
//           <span>🌟</span>
//           <span>{avgUserRating.toFixed(2)}</span>
//         </p>
//         <p>
//           <span>⏳</span>
//           <span>{avgRuntime} min</span>
//         </p>
//       </div>
//     </div>
//   );
// }

function WatchMovie({ movie, onDeleteWatched }) {
  return (
    <div className="watched-movie-card">
      <img
        src={movie.Poster || movie.poster}
        alt={`${movie.Title || movie.title} poster`}
      />
      <div className="watched-movie-overlay">
        <div className="watched-movie-info">
          <h3>{movie.Title || movie.title}</h3>
          <div className="watched-movie-stats">
            <div className="stat">
              <span>⭐️ IMDB</span>
              <strong>{movie.imdbRating}</strong>
            </div>
            <div className="stat">
              <span>🌟 Your Rating</span>
              <strong>{movie.userRating}</strong>
            </div>
            <div className="stat">
              <span>⏱ Runtime</span>
              <strong>{movie.runtime} min</strong>
            </div>
          </div>
        </div>
        <button
          className="btn-delete"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteWatched(movie.imdbID);
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

function MovieDets({
  selectedId,
  onClosedmovie,
  onAddWatched,
  watched,
  onCurrentlyWatching,
  currentlyWatching,
}) {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [trailerKey, setTrailerKey] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const isCurrentlyWatching = currentlyWatching.some(
    (movie) => movie.imdbID === selectedId
  );
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title: title,
      Year: year,
      Poster: poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onClosedmovie();
  }

  useEffect(
    function () {
      async function getMovieDets() {
        try {
          // First fetch movie details from OMDB
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${API}&i=${selectedId}`
          );
          const data = await res.json();
          setMovie(data);

          // Find TMDB movie using IMDB ID
          const tmdbSearchRes = await fetch(
            `https://api.themoviedb.org/3/find/${selectedId}?api_key=67b611c55c9d1b00c642b059ef950b52&external_source=imdb_id`
          );
          const tmdbSearchData = await tmdbSearchRes.json();

          if (
            tmdbSearchData.movie_results &&
            tmdbSearchData.movie_results.length > 0
          ) {
            const tmdbId = tmdbSearchData.movie_results[0].id;

            // Fetch videos from TMDB
            const videosRes = await fetch(
              `https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=67b611c55c9d1b00c642b059ef950b52`
            );
            const videosData = await videosRes.json();

            // Try to find a trailer first
            let video = videosData.results.find(
              (video) => video.type === "Trailer" && video.site === "YouTube"
            );

            // If no trailer, try to find any YouTube video
            if (!video) {
              video = videosData.results.find(
                (video) => video.site === "YouTube"
              );
            }

            // If still no video, try to find any video
            if (!video) {
              video = videosData.results[0];
            }

            if (video) {
              setTrailerKey(video.key);
              setTrailerUrl(
                `https://www.youtube.com/embed/${video.key}?autoplay=0`
              );
              setThumbnailUrl(
                `https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`
              );
            }
          }
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }
      getMovieDets();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "MovieDunia";
      };
    },
    [title]
  );

  function handleTrailerClick() {
    setIsPlaying(true);
  }

  function handleTrailerClose() {
    setIsPlaying(false);
  }

  return (
    <div className="movie-details">
      <button className="btn-back" onClick={onClosedmovie}>
        ←
      </button>

      <div className="movie-header">
        <h1>{title}</h1>
      </div>

      <div className="movie-info">
        <div className="movie-poster">
          <img src={poster} alt={`${title} poster`} />
        </div>

        <div className="movie-content">
          <div className="genre-tags">
            {genre?.split(",").map((g, index) => (
              <span key={index} className="genre-tag">
                {g.trim()}
              </span>
            ))}
          </div>

          <p className="movie-plot">{plot}</p>

          <div className="movie-meta">
            <p>
              <strong>Released:</strong> {released}
            </p>
            <p>
              <strong>Runtime:</strong> {runtime}
            </p>
            <p>
              <strong>Director:</strong> {director}
            </p>
            <p>
              <strong>Starring:</strong> {actors}
            </p>
            {isWatched ? (
              <div className="watched-info">
                <p className="watched-pill">Already watched ✓</p>
                <p className="your-rating">
                  Your rating: {watchedUserRating} ⭐
                </p>
              </div>
            ) : (
              <div className="movie-dets-comb">
                <div className="rating-section">
                  <div className="rating-info">
                    <p>
                      <span>⭐️ IMDB Rating: </span>
                      <strong>{imdbRating}</strong>
                    </p>
                    <div className="rate-movie">
                      <p>Rate this movie:</p>
                      <StarRating
                        maxRating={10}
                        size={24}
                        onSetRating={setUserRating}
                      />
                      {userRating > 0 && (
                        <button className="watchlist-btn" onClick={handleAdd}>
                          <span>📋</span> Add to watched
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="movie-actions">
                    <button
                      className={`currently-watching-btn ${
                        isCurrentlyWatching ? "active" : ""
                      }`}
                      onClick={() => onCurrentlyWatching(movie)}
                    >
                      {isCurrentlyWatching
                        ? "Currently Watching"
                        : "Mark as Currently Watching"}
                    </button>
                  </div>
                </div>
                <div className="movie-trailer">
                  {isPlaying ? (
                    <div className="trailer-player">
                      <button
                        className="close-trailer"
                        onClick={handleTrailerClose}
                      >
                        ×
                      </button>
                      <iframe
                        width="100%"
                        height="100%"
                        src={trailerUrl}
                        title={`${title} Trailer`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <div
                      className="trailer-placeholder"
                      onClick={handleTrailerClick}
                    >
                      <div className="trailer-banner">
                        <img
                          src={thumbnailUrl}
                          alt={`${title} trailer thumbnail`}
                          onError={(e) => {
                            // Fallback to a lower resolution thumbnail if maxresdefault fails
                            e.target.src = `https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg`;
                          }}
                        />
                        <div className="trailer-overlay">
                          <p>Watch Trailer</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function WatchMovieList({ watched, onDeleteWatched }) {
  return (
    <div className="watched-movie-grid">
      {watched.map((movie) => (
        <WatchMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </div>
  );
}

function Loader() {
  return <p className="loader"> Loading..</p>;
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

const API = "8b86815c";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [currentlyWatching, setCurrentlyWatching] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [selectedId, setselectedId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  function handleSelectmovie(id) {
    setselectedId((prevId) => (prevId === id ? null : id));
  }

  function handleCLosedmovie() {
    setselectedId(null);
  }

  function handleAddwatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeletewatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  function handleCurrentlyWatching(movie) {
    setCurrentlyWatching((prev) => {
      const isAlreadyWatching = prev.some((m) => m.imdbID === movie.imdbID);
      if (isAlreadyWatching) {
        return prev.filter((m) => m.imdbID !== movie.imdbID);
      } else {
        return [...prev, movie];
      }
    });
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchMovies(searchQuery) {
      try {
        setIsLoading(true);
        let searchUrl;

        if (searchQuery === "popular") {
          // Generate a random page number between 1 and 10 for variety
          const randomPage = Math.floor(Math.random() * 10) + 1;
          const actualPage = page === 1 ? randomPage : page;

          // Fetch popular movies from TMDB
          const tmdbRes = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=67b611c55c9d1b00c642b059ef950b52&page=${actualPage}`
          );
          const tmdbData = await tmdbRes.json();

          // Shuffle the results array for more variety
          const shuffledResults = [...tmdbData.results].sort(
            () => Math.random() - 0.5
          );

          // Get IMDB IDs for TMDB movies
          const moviesWithImdb = await Promise.all(
            shuffledResults.map(async (movie) => {
              const movieDetails = await fetch(
                `https://api.themoviedb.org/3/movie/${movie.id}?api_key=67b611c55c9d1b00c642b059ef950b52&append_to_response=external_ids`
              );
              const details = await movieDetails.json();
              return details.external_ids.imdb_id;
            })
          );

          // Fetch OMDB details for each movie
          const omdbMovies = await Promise.all(
            moviesWithImdb.map(async (imdbId) => {
              const res = await fetch(
                `http://www.omdbapi.com/?apikey=${API}&i=${imdbId}`
              );
              return res.json();
            })
          );

          if (page === 1) {
            setMovies(omdbMovies);
          } else {
            setMovies((prevMovies) => [...prevMovies, ...omdbMovies]);
          }
          setTotalResults(tmdbData.total_results);
          setHasMore(page < tmdbData.total_pages);
        } else {
          // Regular search
          searchUrl = `http://www.omdbapi.com/?apikey=${API}&s=${searchQuery}&page=${page}`;
          const res = await fetch(searchUrl, { signal });
          const data = await res.json();

          if (data.Response === "True") {
            // Shuffle the search results for variety
            const shuffledResults = [...data.Search].sort(
              () => Math.random() - 0.5
            );

            if (page === 1) {
              setMovies(shuffledResults);
            } else {
              setMovies((prevMovies) => [...prevMovies, ...shuffledResults]);
            }
            setTotalResults(parseInt(data.totalResults));
            setHasMore(page * 10 < parseInt(data.totalResults));
            setMessage("");
          } else {
            if (page === 1) {
              setMovies([]);
              setMessage(`No movies found for "${searchQuery}"`);
            }
          }
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching movies:", error);
          if (page === 1) {
            setMovies([]);
            setMessage("Something went wrong. Please try again.");
          }
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      fetchMovies("popular");
    } else {
      handleCLosedmovie();
      if (page === 1) {
        setMovies([]);
      }
      fetchMovies(query);
    }

    return () => {
      controller.abort();
    };
  }, [query, page]);

  function handleLoadMore() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <div className="app">
      {selectedId ? (
        <MovieDets
          selectedId={selectedId}
          onClosedmovie={handleCLosedmovie}
          onAddWatched={handleAddwatched}
          watched={watched}
          onCurrentlyWatching={handleCurrentlyWatching}
          currentlyWatching={currentlyWatching}
        />
      ) : (
        <>
          <header className="header">
            <Logo />
            <Search
              query={query}
              setQuery={setQuery}
              movies={movies}
              onSelectMovie={handleSelectmovie}
              onFocus={setIsSearchFocused}
            />
          </header>

          <main className="main-content">
            {!isSearchFocused && (
              <section className="movie-section">
                <h2 style={{ fontSize: "2.4rem" }}>Currently Watching</h2>
                <div className="movie-grid scrollable">
                  {currentlyWatching.length > 0 ? (
                    currentlyWatching.map((movie) => (
                      <Movie
                        key={movie.imdbID}
                        movie={movie}
                        onSelectMovie={handleSelectmovie}
                      />
                    ))
                  ) : (
                    <p className="no-movies">
                      No movies currently being watched
                    </p>
                  )}
                </div>
              </section>
            )}

            <section className="movie-section">
              <h2
                className={isSearchFocused ? "heading search-mode" : "heading suggestion-mode"}
              >
                {isSearchFocused
                  ? `Showing search results for "${query}"`
                  : "Suggested To Watch"}
              </h2>
              <div className="movie-grid scrollable">
                {movies.length > 0 ? (
                  movies.map((movie) => (
                    <Movie
                      key={movie.imdbID}
                      movie={movie}
                      onSelectMovie={handleSelectmovie}
                    />
                  ))
                ) : isSearchFocused ? (
                  <p className="no-movies">No movies found for "{query}"</p>
                ) : (
                  <p className="no-movies">Loading movies...</p>
                )}
              </div>
              {hasMore && movies.length > 0 && (
                <button
                  className="load-more-btn"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load More"}
                </button>
              )}
            </section>

            <section className="movie-section">
              <h2>Previously Watched</h2>
              {watched.length > 0 ? (
                <WatchMovieList
                  watched={watched}
                  onDeleteWatched={handleDeletewatched}
                />
              ) : (
                <p className="no-movies">No movies watched yet</p>
              )}
            </section>
          </main>
        </>
      )}
    </div>
  );
}
