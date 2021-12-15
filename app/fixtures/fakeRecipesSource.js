const Recipe = require('../recipe');

module.exports = class RecipesSource {
  constructor() {
    this.recipes = [];
  }

  addRecipe(recipe) {
    this.recipes.push(
      new Recipe({
        title: recipe.title,
        ingredients: recipe.ingredients,
        method: recipe.method,
        time: recipe.time,
        imageUrl: recipe.imageUrl,
      })
    );
  }

  getRecipes() {
    // load in recipes
  }

  getRecipeByIngredients(pantry) {
    const matchingRecipes = [];
    const partialRecipes = [];

    this.recipes.forEach((recipe) => {
      let matchingIngredients = 0;
      recipe.ingredientsSource.ingredients.forEach((ingredient) => {
        if (
          pantry.ingredients.find((pantryIngredient) => pantryIngredient.name === ingredient.name)
        ) {
          matchingIngredients += 1;
        }
      });

      const score = matchingIngredients / recipe.ingredientsSource.ingredients.length;

      if (score === 1) {
        matchingRecipes.push(recipe);
      } else if (score > 0) {
        const missingIngredients = recipe.ingredientsSource.ingredients.filter(
          (ingredient) =>
            !pantry.ingredients.find(
              (pantryIngredient) => pantryIngredient.name === ingredient.name
            )
        );
        partialRecipes.push({ recipe, missingIngredients });
      }
    });

    return { matchingRecipes, partialRecipes };
  }
};
