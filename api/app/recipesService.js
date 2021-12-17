module.exports = class RecipesService {
  constructor(recipeSource) {
    this.recipeSource = recipeSource;
  }

  addRecipe(recipe) {
    this.recipeSource.addRecipe(recipe);
  }

  getRecipeByIngredients(pantry) {
    return this.recipeSource.getRecipeByIngredients(pantry);
  }
};
