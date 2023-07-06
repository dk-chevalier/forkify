import icons from 'url:../../img/icons.svg';

import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupBtn('next');
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupBtn('prev');
    }
    // Other page
    if (curPage < numPages) {
      return this._generateMarkupBtn('prev') + this._generateMarkupBtn('next');
    }
    // Page 1, and there are no other pages
    return '';
  }

  _generateMarkupBtn(btnType) {
    const curPage = this._data.page;
    return `
    <button data-goto="${
      btnType === 'next' ? curPage + 1 : curPage - 1
    }" class="btn--inline pagination__btn--${btnType}">
        ${
          btnType === 'next'
            ? `<span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
             </svg>`
            : `<svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>`
        }
    </button>
    `;
  }
}

export default new PaginationView();
