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
    //todo: load in recipes
  }

  getRecipeByIngredients(pantry) {
    const matchingRecipes = [];
    const partialRecipes = [];

    this.recipes.forEach((recipe) => {
      let matchingIngredients = 0;
      const missingIngredients = [];
      recipe.ingredientsSource.ingredients.forEach((ingredient) => {
        const measure = Object.keys(ingredient.quantity)[0];
        // invert this and get implied matching ingredients from missing?
        if (
          pantry.ingredients.find((pantryIngredient) => {
            return (
              pantryIngredient.name === ingredient.name &&
              pantryIngredient.quantity[measure] >= ingredient.quantity[measure]
            );
          })
        ) {
          matchingIngredients += 1;
        } else {
          missingIngredients.push(ingredient);
        }
      });

      const score = matchingIngredients / recipe.ingredientsSource.ingredients.length;

      if (score === 1) {
        matchingRecipes.push(recipe);
      } else if (score > 0) {
        partialRecipes.push({ recipe, missingIngredients });
      }
    });

    return { matchingRecipes, partialRecipes };
  }
};
