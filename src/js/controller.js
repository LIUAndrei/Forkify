import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import 'regenerator-runtime/runtime';
import { MODAL_CLOSE_SECONDS, UPLOAD_SUCCESS_MESSAGE } from './config.js';

const controlRecipies = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) {
      return;
    }
    // update search results to mark selected choice
    resultsView.update(model.loadSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError(`${error}`);
  }
};

const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuerry();
    if (!query) return;

    await model.loadSearchResults(query);
    //resultsView.render(model.state.search.results);
    resultsView.render(model.loadSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (error) {
    recipeView.renderError(`${error}`);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.loadSearchResultsPage(goToPage));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else if (model.state.recipe.bookmarked) {
    model.deleteBookmark(model.state.recipe.id);
  }
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage(UPLOAD_SUCCESS_MESSAGE);

    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SECONDS * 1000);
  } catch (error) {
    console.log(`🤣 ${error.message}`);
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  recipeView.addHandlerRender(controlRecipies);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
