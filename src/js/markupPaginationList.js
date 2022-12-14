function markupPrevButton(page) {
  return `${
    page !== 1
      ? `<button class="arrow pagination__button" type="button" data-page="${
          page - 1
        }"><</button>`
      : ''
  }`;
}

function markupNextButton(page, maxPages) {
  return `${
    page === maxPages
      ? ''
      : `<button class="arrow pagination__button" type="button" data-page="${
          page + 1
        }">></button>`
  }`;
}

function arrayHelp(startIteration, finishIteration) {
  const result = [];
  for (let i = startIteration; i <= finishIteration; i++) {
    result.push(i);
  }
  return result;
}

function markupButtons(page, maxPages) {
  if (maxPages <= 9) {
    return arrayHelp(1, maxPages);
  }
  if (page > maxPages - 2) {
    return [1, '...', ...arrayHelp(maxPages - 4, maxPages)];
  }
  if (page >= maxPages - 4) {
    return [
      1,
      '...',
      ...arrayHelp(page - 2, page + 4).filter(item => item <= maxPages),
    ];
  }
  if (page >= 6) {
    return [1, '...', ...arrayHelp(page - 2, page + 2), '...', maxPages];
  }
  if (page < 6 && page >= 3) {
    return [
      ...arrayHelp(page - 4, page + 2).filter(item => item >= 1),
      '...',
      maxPages,
    ];
  }
  if (page < 3) {
    return [...arrayHelp(1, 5), '...', maxPages];
  }
}

function markupPaginationList(page, maxPages) {
  const markupButtonsList = markupButtons(page, maxPages)
    .map(item => {
      console.log(item);
      return `<button type="button" class="pagination__button ${
        page === item ? 'current' : ''
      } ${
        item === '...' ? 'no-active' : ''
      }" data-page="${item}">${item}</button>`;
    })
    .join(' ');
  return (
    markupPrevButton(page) +
    markupButtonsList +
    markupNextButton(page, maxPages)
  );
}

export { markupPaginationList };
