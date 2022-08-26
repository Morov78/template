import { API } from './js/api';
import { markupList } from './js/markupList';
import { throttle } from 'lodash';
import { markupPaginationList } from './js/markupPaginationList';

const apiService = new API();
const refs = {
  galleryList: document.querySelector('.gallery-js'),
  buttonPageTop: document.querySelector('.page-up'),
  pagginationList: document.querySelector('.pagination-js'),
};

window.addEventListener('scroll', throttle(onScroll, 500));
refs.buttonPageTop.addEventListener('click', onClickButtonPageTop);
refs.pagginationList.addEventListener('click', onClickPagginationList);

fetchData();

function fetchData() {
  apiService.getTrendingMovies().then(data => {
    // console.log('page=', apiService.page, '  maxPages=', apiService.maxPages);
    refs.galleryList.innerHTML = '';
    renderMoviesList(data);
    refs.pagginationList.innerHTML = '';
  });
}

async function renderMoviesList(data) {
  const genresList = await apiService.getGenresList();
  // console.log(data, genresList);
  refs.galleryList.insertAdjacentHTML(
    'beforeend',
    markupList(data, genresList)
  );
  refs.pagginationList.insertAdjacentHTML(
    'beforeend',
    markupPaginationList(apiService.page, apiService.maxPages)
  );
}

function onClickPagginationList(event) {
  const currentPage = event.target.dataset.page;
  if (!currentPage) {
    return;
  }
  apiService.setPage(Number(currentPage));
  fetchData();
}

function onClickButtonPageTop() {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
}

function onScroll() {
  // console.log("scroll");
  const isHidden = refs.buttonPageTop.classList.contains('is-hidden');
  const isVisible = window.scrollY >= window.innerHeight * 3;
  // console.log(isHidden,isVisible);
  if (isVisible & isHidden) {
    refs.buttonPageTop.classList.remove('is-hidden');
  }
  if (!isVisible & !isHidden) {
    refs.buttonPageTop.classList.add('is-hidden');
  }
}
