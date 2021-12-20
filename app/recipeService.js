module.exports = class RecipeService {
  constructor(recipeSource) {
    this.recipeSource = recipeSource;
    this.healthy = true;
    console.log('RecipeService initialized');
  }

  addRecipe(recipe) {
    console.log('inside addRecipe');
    return this.recipeSource.addRecipe(recipe).then((res) => {
      if (res.error) {
        throw new Error(`failed to add recipe ${res.error}`);
      }
      return Promise.resolve(recipe);
    });
  }

  getAllRecipes() {
    return this.recipeSource.getAllRecipes();
  }

  getRecipeByIngredients(pantry) {
    return this.recipeSource.getRecipeByIngredients(pantry);
  }
};
