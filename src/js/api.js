import axios from 'axios';
export class API {
  BASE_URL = 'https://api.themoviedb.org/3';
  KEY = '5b6b31e1fe12fe8c46151504ff095a5b';
  constructor() {
    this.page = 1;
  }
  getTrendingMovies = async () => {
    const response = await axios.get(
      `${this.BASE_URL}/trending/movie/week?api_key=${this.KEY}&page=3`
    );
    return response.data.results;
  };
  getGenresList = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.KEY}`
    );
    return response.data.genres;
  };
  getPaginationList = () => {};
}
