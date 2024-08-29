import './App.css';
import { getMovieList, searchMovie } from './api';
import React, { useEffect, useState }  from 'react';

const App = () => {
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, [])

  const PopularMoviesList = () => {
    return popularMovies.map((movie, i) => {
      return(
        <div className="Movie-wrapper" key={i}>
        <div className="Movie-title">{movie.title}</div>
        <img className="Movie-image" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} />
        <div className="Movie-date">release: {movie.release_date}</div>
        <div className="Movie-rate">{movie.vote_average}</div>
      </div>
      )
    })
  }

  const search = async (q) => {
    // if(q.lenght > 2) {
      const query = await searchMovie(q)
      setPopularMovies(query.results)
    // }
  }



  return (
    <div className="App">
      <header className="App-header">
      <h1>Deuz Movies</h1>
      <input
      placeholder ="cari film anda..."
      className="Movie-search"
      onChange={({ target }) => search(target.value)}
      />
      <div className="Movie-container">
        <PopularMoviesList />
      </div>
      </header>
    </div>
  );
}


 
export default App;
