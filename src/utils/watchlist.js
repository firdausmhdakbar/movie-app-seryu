export const addToWatchlist = (movie) => {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  watchlist.push(movie);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
};

export const removeFromWatchlist = (movieId) => {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  watchlist = watchlist.filter(movie => movie.id !== movieId);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
};

export const getWatchlist = () => {
  return JSON.parse(localStorage.getItem('watchlist')) || [];
};
