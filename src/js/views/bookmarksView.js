import View from './View.js';
import previewView from './previewView.js';
import { NO_BOOKMARKS_MESSAGE } from '../config.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _message = '';
  _errorMessage = NO_BOOKMARKS_MESSAGE;

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
