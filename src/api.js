import axios from "axios"

const apiKey = process.env.REACT_APP_APIKEY
const baseUrl = process.env.REACT_APP_BASEURL

export const getMovieList = async () => {
    const movie = await axios.get(`${baseUrl}/movie/now_playing?page=1&api_key=${apiKey}`)
    return movie.data.results
  
}

export const searchMovie = async (q) => {
    const search = await axios.get(`${baseUrl}/search/movie?query=${q}&page=1&api_key=${apiKey}`)
    return search.data
} 

export const getMovieDetails = async (id) => {
    const details = await axios.get(`${baseUrl}/movie/${id}?api_key=${apiKey}`);
    return details.data;
};

export const getNowPlayingMovies = async () => {
    const response = await axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`);
    return response.data.results;
};


export const getTopRatedMovies = async () => {
    const response = await axios.get(`${baseUrl}/movie/top_rated?api_key=${apiKey}`);
    return response.data.results;
};
