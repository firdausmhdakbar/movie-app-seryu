import React, { useEffect, useState } from 'react';
import { getNowPlayingMovies, getTopRatedMovies, searchMovie } from '../api';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, login, logout } = useAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      const nowPlaying = await getNowPlayingMovies();
      const topRated = await getTopRatedMovies();
      setNowPlayingMovies(nowPlaying);
      setTopRatedMovies(topRated);
      setDisplayedMovies(nowPlaying);
      setLoading(false); 
    };

    if (user) {
      fetchMovies();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleCategoryClick = async (category) => {
    if (category === 'now_playing') {
      setDisplayedMovies(nowPlayingMovies);
    } else if (category === 'top_rated') {
      setDisplayedMovies(topRatedMovies);
    }
  };

  const search = async (query) => {
    if (query.length > 2) {
      const results = await searchMovie(query);
      setSearchResults(results.results);
      setDisplayedMovies(results.results);
    }
  };

  const MovieList = ({ movies }) => {
    return movies.map((movie) => (
      <div className="Movie-wrapper" key={movie.id}>
        <div className="Movie-title">{movie.title}</div>
        <img
          className="Movie-image"
          src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="Movie-date">Release: {movie.release_date}</div>
        <div className="Movie-rate">Rating: {movie.vote_average}</div>
      </div>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Deuz Movies</h1>
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <>
            <button onClick={logout}>Logout</button>
            <input
              placeholder="Search movies..."
              className="Movie-search"
              onChange={({ target }) => search(target.value)}
            />
            <nav>
              <button onClick={() => handleCategoryClick('now_playing')}>Now Playing</button>
              <button onClick={() => handleCategoryClick('top_rated')}>Top Rated</button>
            </nav>
            <div className="Movie-container">
              <MovieList movies={displayedMovies} />
            </div>
          </>
        ) : (
          <button onClick={login}>Login with TMDB</button>
        )}
      </header>
    </div>
  );
};

export default HomePage;
