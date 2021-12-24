module.exports = class RecipeService {
  constructor(recipeSource) {
    this.recipeSource = recipeSource;
    this.healthy = true;
    console.log('RecipeService initialized');
  }

  async addRecipe(recipe) {
    const response = await this.recipeSource.addRecipe(recipe);
    return Promise.resolve(response);
  }

  getAllRecipes() {
    return this.recipeSource.getAllRecipes();
  }

  getRecipeByIngredients(pantry) {
    return this.recipeSource.getRecipeByIngredients(pantry);
  }
};
