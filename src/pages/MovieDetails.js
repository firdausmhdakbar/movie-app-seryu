import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const details = await getMovieDetails(id);
      setMovie(details);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
     
    </div>
  );
};

export default MovieDetails;
