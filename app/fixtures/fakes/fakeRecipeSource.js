const recipes = require('../recipes.json');

module.exports = class RecipeSource {
  constructor() {
    this.recipes = this.getRecipes();
  }

  getRecipes() {
    return Promise.resolve(recipes.recipes);
  }
};
