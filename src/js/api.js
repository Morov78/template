import axios from 'axios';
export class API {
  BASE_URL = 'https://api.themoviedb.org/3';
  KEY = '5b6b31e1fe12fe8c46151504ff095a5b';
  constructor() {
    this.page = 1;
    this.maxPages = null;
  }
  getTrendingMovies = async () => {
    const response = await axios.get(
      `${this.BASE_URL}/trending/movie/week?api_key=${this.KEY}&page=${this.page}`
    );
    this.maxPages = Math.ceil(response.data.total_pages / 20);
    // this.maxPages = 20;
    return response.data.results;
  };
  getGenresList = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.KEY}`
    );
    return response.data.genres;
  };
  setPage = page => {
    this.page = page;
  };
}
