import { useEffect, useState } from "react";
import StarRating from "./StarRating";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
function Logo() {
  return (
    <div className="logo">
      <span role="img">🎥</span>
      <h1>Moviedunia</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
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
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
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

function WatchSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
function MovieDets({ selectedId, onClosedmovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState("");
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
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
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: parseInt(runtime),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onClosedmovie();
  }
  useEffect(
    function () {
      async function getMovieDets() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
      }
      getMovieDets();
    },
    [selectedId]
  );
  useEffect(function () {
    if(!title) return;
    document.title = `Movie | ${title}`;

    return function(){
      document.title="MovieDunia"
    }
  }, [title]);
  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onClosedmovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${movie} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb Rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  +Add to List
                </button>
              )}
            </>
          ) : (
            <p>You already rate this movie having {watchedUserRating} star </p>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p> Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}
function WatchMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
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
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [selectedId, setselectedId] = useState(null);
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
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
  
    async function fetchMovies(searchQuery) {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API}&s=${searchQuery}`,
          { signal }
        );
  
        if (!res.ok) throw new Error("Failed to fetch movies");
  
        const data = await res.json();
  
        if (data.Search) {
          setMovies(data.Search);
          setMessage("");
        } else {
          setMovies([]);
          setMessage(`No movies found for "${searchQuery}"`);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching movies:", error);
          setMovies([]);
          setMessage("Something went wrong. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  
    if (query.length < 3) {
      fetchMovies("Interstellar"); // Fetch default movies
    } else {
      handleCLosedmovie();
      fetchMovies(query);
    }
  
    return () => {
      controller.abort(); // Cleanup: Abort previous fetch if query changes
    };
  }, [query]);
  

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <SearchMatched movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : movies.length > 0 ? (
            <MovieList movies={movies} onSelectMovie={handleSelectmovie} />
          ) : (
            <p>{message}</p>
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDets
              selectedId={selectedId}
              onClosedmovie={handleCLosedmovie}
              onAddWatched={handleAddwatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchSummary watched={watched} />
              <WatchMovieList
                watched={watched}
                onDeleteWatched={handleDeletewatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
