import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the received obj to the DOM
   * @param {Object | Object[]} data that has to be rendered
   * @param {boolean} [render=true] if false - create markup string instead of rendering to the DOM
   * @returns {undefined | string} string is html code. Returned if render = false
   * @this {Object} View obj instance
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElements.forEach((newElement, i) => {
      const currentElement = currentElements[i];

      if (
        !newElement.isEqualNode(currentElement) &&
        newElement.firstChild?.nodeValue.trim() !== ''
      ) {
        currentElement.textContent = newElement.textContent;
      }

      if (!newElement.isEqualNode(currentElement)) {
        Array.from(newElement.attributes).forEach(attribute =>
          currentElement.setAttribute(attribute.name, attribute.value)
        );
      }

      // if (newElement.classList.contains('btn--update-servings')) {
      //   currentElement.dataset.updateServingsTo =
      //     newElement.dataset.updateServingsTo;
      // }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${this._errorMessage} ${message}</p>
      </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="recipe">
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
