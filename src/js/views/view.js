import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instaed of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author David Knight
   * @todo Finish implementation
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

    // Convert Above Markup String into real DOM node objects....becomes like a big object that is like a virtual DOM, that can then be compared to the real DOM on our page
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // newElements is esentially the DOM that would have been updated when this method was called.....but now we can compare each element to the ones already rendered
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // curElements = current elements rendered on the DOM
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // Below compares the 2 nodes
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //   console.log(curEl, newEl.isEqualNode(curEl));

      // The firstChild node is what actually is what contains the text...whereas newEl is actually an element node (rather than a text node)
      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates Changed Attributes (basically replacing all the attributes in the current element by the attributes coming from the new element, thus allowing the buttons to update their data so we can keep adding/subtracting with them)
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
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

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
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
