// preview__link--active is class for currently active choice
import previewView from './previewView.js';
import View from './View.js';
import { WRONG_QUERY_MESSAGE } from '../config.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _message = '';
  _errorMessage = WRONG_QUERY_MESSAGE;

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
