module.exports = class RecipeService {
  constructor(recipeSource) {
    this.recipeSource = recipeSource;
    this.healthy = true;
    console.log('RecipeService initialized');
  }

  async addRecipe(recipe) {
    const response = await this.recipeSource.addRecipe(recipe);
    return response;
  }

  async getAllRecipes() {
    const response = await this.recipeSource.getAllRecipes();
    return response;
  }

  async getRecipeByIngredients(pantry) {
    const response = await this.recipeSource.getRecipeByIngredients(pantry);
    return response;
  }
};
