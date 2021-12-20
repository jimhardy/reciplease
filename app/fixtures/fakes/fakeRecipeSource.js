const recipeStore = require('../recipes.json');
const Recipe = require('../../recipe');

module.exports = class RecipeSource {
  constructor() {
    this.recipes = [];
    this.initializeRecipes();
  }

  initializeRecipes() {
    recipeStore.recipes.forEach((recipe) => this.addRecipe(recipe));
  }

  getAllRecipes() {
    return Promise.resolve(this.recipes);
  }

  addRecipe(recipe) {
    const newRecipe = new Recipe({
      title: recipe.title,
      ingredients: recipe.ingredients,
      method: recipe.method,
      time: recipe.time,
      imageUrl: recipe.imageUrl,
    });

    this.recipes.push(newRecipe);
    return Promise.resolve(newRecipe);
  }

  getRecipeByIngredients(pantry) {
    const matchingRecipes = [];
    const partialRecipes = [];

    this.recipes.forEach((recipe) => {
      const missingIngredients = [];
      recipe.ingredientsSource.ingredients.forEach((ingredient) => {
        const measure = Object.keys(ingredient.quantity)[0];
        if (
          !pantry.ingredients.find(
            (pantryIngredient) =>
              pantryIngredient.name === ingredient.name &&
              pantryIngredient.quantity[measure] >= ingredient.quantity[measure]
          )
        ) {
          missingIngredients.push(ingredient);
        }
      });

      const score =
        (recipe.ingredientsSource.ingredients.length - missingIngredients.length) /
        recipe.ingredientsSource.ingredients.length;

      if (score === 1) {
        matchingRecipes.push(recipe);
      } else if (score > 0) {
        partialRecipes.push({ recipe, missingIngredients });
      }
    });
    return { matchingRecipes, partialRecipes };
  }
};
