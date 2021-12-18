module.exports = class RecipeService {
  constructor(recipeSource) {
    this.recipeSource = recipeSource;
    this.healthy = true;
    console.log('RecipeService initialized');
  }

  addRecipe(recipe) {
    this.recipeSource.addRecipe(recipe);
  }

  getAllRecipes() {
    return this.recipeSource.getAllRecipes();
  }

  getRecipeByIngredients(pantry) {
    return this.recipeSource.getRecipeByIngredients(pantry);
  }
};
