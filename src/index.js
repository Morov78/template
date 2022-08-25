import { getTrendingMovies, getGenresList } from './js/api';
import { API } from './js/api';
import { markupList } from './js/markupList';
import { throttle } from 'lodash';
console.log(API);
const ApiService = new API();
console.log(ApiService);
const galleryEl = document.querySelector('.gallery__list');
const buttonPageTop = document.querySelector('.page-up');
const pagginationList = document.querySelector('.paggination-js');

window.addEventListener('scroll', throttle(onScroll, 500));
buttonPageTop.addEventListener('click', onClickButtonPageTop);

ApiService.getTrendingMovies().then(data => {
  renderMoviesList(data);
});

async function renderMoviesList(data) {
  const genresList = await ApiService.getGenresList();
  // console.log(data, genresList);
  galleryEl.insertAdjacentHTML('beforeend', markupList(data, genresList));
}

function onClickButtonPageTop() {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
}

function onScroll() {
  // console.log("scroll");
  const isHidden = buttonPageTop.classList.contains('is-hidden');
  const isVisible = window.scrollY >= window.innerHeight * 3;
  // console.log(isHidden,isVisible);
  if (isVisible & isHidden) {
    buttonPageTop.classList.remove('is-hidden');
  }
  if (!isVisible & !isHidden) {
    buttonPageTop.classList.add('is-hidden');
  }
}
