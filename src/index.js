import { getTrendingMovies, getGenresList } from './js/api';
import { markupList } from './js/markupList';
import { throttle } from 'lodash';

const galleryEl = document.querySelector('.gallery__list');
const buttonPageTop = document.querySelector('.page-up');

window.addEventListener('scroll', throttle(onScroll, 500));
buttonPageTop.addEventListener('click', onClickButtonPageTop);

getTrendingMovies().then(data => {
  renderMoviesList(data);
});

async function renderMoviesList(data) {
  const genresList = await getGenresList();
  console.log(data, genresList);
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
