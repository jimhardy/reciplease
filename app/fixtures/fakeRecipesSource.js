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

  getRecipeByIngredients(pantry) {
       const pantryIngredients = pantry.ingredients.map(
      (ingredient) => ingredient.name
    );
    const matchingRecipes = [];
    const partialRecipes = [];

    this.recipes.forEach((recipe) => {
      const recipeIngredients = recipe.ingredients.ingredients.map(
        (ingredient) => ingredient.name
      );
      let matchingIngredients = 0;
      recipeIngredients.forEach((ingredient) => {
        if (pantryIngredients.includes(ingredient)) {
          matchingIngredients += 1;
        }
      });

      const score = matchingIngredients / recipeIngredients.length;

      if (score === 1) {
        matchingRecipes.push(recipe);
      } else if (score > 0) {
        const missingIngredients = recipeIngredients.filter(ingredient => !pantryIngredients.includes(ingredient))
        partialRecipes.push({recipe, missingIngredients});
      }
    });

    return { matchingRecipes, partialRecipes };
  }
};
