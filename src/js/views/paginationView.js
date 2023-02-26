import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      if (btn.classList.contains('pagination__btn--next')) {
        handler(+btn.dataset.currentPage + 1);
      }
      if (btn.classList.contains('pagination__btn--prev')) {
        handler(+btn.dataset.currentPage - 1);
      }
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;

    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (currentPage === 1 && numberOfPages > 1) {
      return `
      <button data-current-page="${currentPage}" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
      </svg>
      </button>`;
    }

    if (currentPage === numberOfPages && numberOfPages > 1) {
      return `
      <button data-current-page="${currentPage}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
      </button>`;
    }

    if (currentPage > 1 && currentPage < numberOfPages) {
      return `
        <button data-current-page="${currentPage}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
        </button>
        <button data-current-page="${currentPage}" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </button>
    
    `;
    }
    return '';
  }
}

export default new PaginationView();
