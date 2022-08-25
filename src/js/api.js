const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = '5b6b31e1fe12fe8c46151504ff095a5b';
import axios from 'axios';

async function getTrendingMovies() {
  const response = await axios.get(
    `${BASE_URL}/trending/movie/week?api_key=${KEY}`
  );
  return response.data.results;
}
async function getGenresList() {
  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}`
  );
  return response.data.genres;
}

export { getTrendingMovies, getGenresList };
