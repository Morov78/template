import axios from 'axios';
export class API {
  BASE_URL = 'https://api.themoviedb.org/3';
  KEY = '5b6b31e1fe12fe8c46151504ff095a5b';
  constructor() {
    this.page = 6;
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
  renderPaginationList = () => {
    // console.log(this.page);
    const prev = `<button type="button" data-page="${
      this.page - 1
    }" class="prevButton active" ${
      this.page === 1 ? 'disabled' : ''
    }><</button>`;
    const next = `<button type="button" data-page="${
      this.page + 1
    }" class="nextButton active" ${
      this.page === this.maxPages ? 'disabled' : ''
    }">></button>`;
    const markupPaginationList = markupPagination(this.page, this.maxPages);
    const markupArray = markupPaginationList.map(item => {
      return `<button type="button" ${
        this.page === item ? "class='noactive'" : ''
      } data-page="${item}">${item}</button>`;
    });
    return prev + markupArray.join(' ') + next;
  };
  setPage = page => {
    this.page = page;
  };
  incrementPage = () => {
    this.page += 1;
  };
  decrementPage = () => {
    this.page -= 1;
  };
}
function markupPagination(currentPage, maxPages) {
  console.log(currentPage);
  if (currentPage > maxPages - 2) {
    return (array = [
      1,
      '...',
      maxPages - 4,
      maxPages - 3,
      maxPages - 2,
      maxPages - 1,
      maxPages,
    ]);
  }
  if (currentPage >= maxPages - 4) {
    const array = [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      currentPage + 3,
      currentPage + 4,
    ].filter(item => item <= maxPages);
    return [1, '...', ...array];
  }
  if (currentPage >= 6) {
    return [
      1,
      '...',
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      '...',
      maxPages,
    ];
  }
  if (currentPage < 6 && currentPage >= 3) {
    const array = [
      currentPage - 4,
      currentPage - 3,
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ].filter(item => item >= 1);
    array.push('...', maxPages);
    return array;
  }
  if (currentPage < 3) {
    return (array = [1, 2, 3, 4, 5, '...', maxPages]);
  }
}
{
  /* <button type="button" data-page="${
        this.page - 1
      }" class="prevButton active" ${
      this.page === 1 ? 'disabled' : ''
    }><<</button>
      <button type="button" data-page="${this.page}" class="noactive">${
      this.page
    }</button>
    <button type="button" data-page="${
      this.page + 1
    }" class="nextButton active" ${
      this.page === this.maxPages ? 'disabled' : ''
    }">>></button> */
}
