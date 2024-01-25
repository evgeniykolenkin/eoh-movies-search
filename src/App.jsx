// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import menuImg from "./assets/menu.png";
import logoImg from "./assets/logo.png";
import searchImg from "./assets/search.png";
import markImg from "./assets/mark.png";
import avatarImg from "./assets/avatar.jpg";
import { MovieCard } from "./components/MovieCard";
import { SelectedMovie } from "./components/SelectedMovie";

// ?? get search title
// ** `http://www.omdbapi.com/?apikey=${API_KEY}=${title}`

// ?? get search id
// ** `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`

const API_KEY = "c360273d";

export function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();
  const [search, setSearch] = useState("spider man");
  const [timeoutId, setTimeoutId] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [SearchBtnStatus, setSearchBtnStatus] = useState(false);

  const searchRef = useRef();

  const clearSearchInput = () => {
    console.log("@clearSearch");
    setSearch("");
    setSearchBtnStatus(false);
    searchRef.current.focus();
  };

  const getSearchedMovies = async (title) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`
    );
    setMovies(response.data.Search);
    if (title) {
      setSearchBtnStatus(true);
    }
  };

  const searchDebounce = (e) => {
    clearTimeout(timeoutId);
    setSearch(e.target.value);
    const timeout = setTimeout(
      () => getSearchedMovies(e.target.value.trim()),
      800
    );
    setTimeoutId(timeout);
  };

  const getCurrentMovie = async (id) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
    );
    setSelectedMovie(response.data);
    document.body.classList.add("fixed");
  };

  useEffect(() => {
    getSearchedMovies(search);
  }, []);

  return (
    <div className="container">
      <header>
        <nav>
          <div className="logo">
            <img src={menuImg} alt="burger icon" />
            <img src={logoImg} alt="logo movies eoh" />
          </div>
          <ul>
            <li>Главная</li>
            <li className="active">Фильмы</li>
            <li>Сериалы</li>
          </ul>

          <div className="search__mark_avatar">
            <label className="search">
              <img src={searchImg} alt="search image" />
              <input
                className="search__input"
                placeholder="Поиск по сайту"
                value={search}
                onChange={searchDebounce}
                ref={searchRef}
              />
              <button
                className={
                  SearchBtnStatus
                    ? "search__btn show__search__btn"
                    : "search__btn"
                }
                onClick={clearSearchInput}
              >
                очистить
              </button>
            </label>
            <button
              className={
                SearchBtnStatus
                  ? "search__btn show__search__btn"
                  : "search__btn"
              }
              onClick={clearSearchInput}
            >
              очистить
            </button>
            <img className="mark" src={markImg} alt="book mark" />
            <img className="avatar" src={avatarImg} alt="avatar user" />
          </div>
        </nav>
      </header>

      <main>
        <h2>Результаты поиска: </h2>
        {showDetails && (
          <SelectedMovie
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
            setShowDetails={setShowDetails}
          />
        )}

        <div className="movies__list">
          {movies ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                getCurrentMovie={getCurrentMovie}
                setShowDetails={setShowDetails}
              />
            ))
          ) : (
            <div className="loading">
              <p>No results</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
